import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { sign, Secret, SignOptions } from 'jsonwebtoken';
import prisma from '../config/db';
import {
    registerUserSchema,
    registerScholarSchema,
    loginSchema,
} from '../validators/authValidators';
import { Role, ScholarStatus } from '@prisma/client';

interface JwtPayload {
    userId: string;
    role: Role;
}

const generateToken = (userId: string, role: Role): string => {
    const jwtSecret: Secret = process.env.JWT_SECRET || 'default-secret-key';
    const expiresIn: string | number = process.env.JWT_EXPIRES_IN || '7d';
    const payload: JwtPayload = { userId, role };
    const jwtOptions: SignOptions = { expiresIn: expiresIn as unknown as any };
    return sign(payload, jwtSecret, jwtOptions);
};

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const validation = registerUserSchema.safeParse(req.body);

        if (!validation.success) {
            res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: validation.error.issues.map((err) => ({
                    field: err.path.join('.'),
                    message: err.message,
                })),
            });
            return;
        }

        const { email, password, name } = validation.data;

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            res.status(400).json({
                success: false,
                message: 'User with this email already exists',
            });
            return;
        }

        const salt: string = await bcrypt.genSalt(10);
        const hashedPassword: string = await bcrypt.hash(password, salt);

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: Role.USER,
            },
        });

        const token: string = generateToken(newUser.id, newUser.role);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                token,
                user: {
                    id: newUser.id,
                    email: newUser.email,
                    name: newUser.name,
                    role: newUser.role,
                },
            },
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error during registration',
        });
    }
};

export const registerScholar = async (req: Request, res: Response): Promise<void> => {
    try {
        const validation = registerScholarSchema.safeParse(req.body);

        if (!validation.success) {
            res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: validation.error.issues.map((err) => ({
                    field: err.path.join('.'),
                    message: err.message,
                })),
            });
            return;
        }

        const {
            email, password, name, bio, qualification, experience,
            phoneNumber, specialization, sanadUrl, additionalDocs
        } = validation.data;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            res.status(400).json({
                success: false,
                message: 'User with this email already exists',
            });
            return;
        }

        // Hash password
        const salt: string = await bcrypt.genSalt(10);
        const hashedPassword: string = await bcrypt.hash(password, salt);

        // Create user with scholar profile (PENDING status)
        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: Role.SCHOLAR,
                scholar: {
                    create: {
                        bio: bio || null,
                        qualification: qualification || null,
                        experience: experience || null,
                        phoneNumber: phoneNumber || null,
                        specialization: specialization || null,
                        sanadUrl: sanadUrl || null,
                        additionalDocs: additionalDocs || null,
                        status: ScholarStatus.PENDING,
                    },
                },
            },
            include: {
                scholar: true,
            },
        });

        console.log('📝 New scholar registration:', {
            name: newUser.name,
            email: newUser.email,
            scholarId: newUser.scholar?.id,
            status: newUser.scholar?.status,
        });

        res.status(201).json({
            success: true,
            message: 'Your scholar application has been submitted successfully. The admin team will review your credentials and approve your account. You will be notified once approved.',
            data: {
                user: {
                    id: newUser.id,
                    email: newUser.email,
                    name: newUser.name,
                    role: newUser.role,
                },
                scholar: {
                    id: newUser.scholar?.id,
                    status: newUser.scholar?.status,
                },
            },
        });
    } catch (error) {
        console.error('Scholar registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error during scholar registration',
        });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const validation = loginSchema.safeParse(req.body);

        if (!validation.success) {
            res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: validation.error.issues.map((err) => ({
                    field: err.path.join('.'),
                    message: err.message,
                })),
            });
            return;
        }

        const { email, password } = validation.data;
        console.log('🔑 Login attempt for:', email);

        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                scholar: true,
            },
        });

        if (!user) {
            console.log('❌ User not found:', email);
            res.status(400).json({
                success: false,
                message: 'Invalid email or password',
            });
            return;
        }

        console.log('🔍 Verifying password...');
        const isValidPassword: boolean = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            console.log('❌ Invalid password for:', email);
            res.status(400).json({
                success: false,
                message: 'Invalid email or password',
            });
            return;
        }

        // Critical Business Rule: Check if scholar is approved before allowing login
        if (user.role === Role.SCHOLAR && user.scholar) {
            const scholarStatus = user.scholar.status;

            if (scholarStatus === ScholarStatus.PENDING) {
                console.log('⏳ Pending scholar login attempt:', email);

                // Log the login attempt
                await prisma.scholarLoginAttempt.create({
                    data: {
                        scholarId: user.scholar.id,
                        email: user.email,
                        ipAddress: req.ip || req.socket.remoteAddress || 'unknown',
                        userAgent: req.headers['user-agent'] || 'unknown',
                    }
                }).catch(err => {
                    console.error('Failed to log scholar login attempt:', err);
                });

                res.status(403).json({
                    success: false,
                    message: 'Your scholar application is still under review. The admin team has been notified of your login attempt. Please wait for approval.',
                    status: 'PENDING',
                });
                return;
            }

            if (scholarStatus === ScholarStatus.REJECTED) {
                console.log('❌ Rejected scholar login attempt:', email);
                res.status(403).json({
                    success: false,
                    message: 'Your scholar application has been rejected. Please contact admin for more information or register as a regular user.',
                    status: 'REJECTED',
                });
                return;
            }
        }

        console.log('✅ Login successful for:', email);
        const token: string = generateToken(user.id, user.role);

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    scholarId: user.scholar?.id || null,
                },
            },
        });
    } catch (error) {
        console.error('❌ Login error:', {
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
            error: error
        });
        res.status(500).json({
            success: false,
            message: 'Internal server error during login',
            error: process.env.NODE_ENV === 'development' ?
                (error instanceof Error ? error.message : 'Unknown error') :
                undefined
        });
    }
};