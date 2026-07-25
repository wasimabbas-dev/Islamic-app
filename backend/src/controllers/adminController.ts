import { Request, Response } from 'express';
import prisma from '../config/db';
import { ScholarStatus } from '@prisma/client';

const getStringParam = (param: string | string[] | undefined): string | undefined => {
    if (!param) return undefined;
    return Array.isArray(param) ? param[0] : param;
};

// Get all pending scholar applications with full details
export const getPendingScholars = async (req: Request, res: Response): Promise<void> => {
    try {
        const pendingScholars = await prisma.scholar.findMany({
            where: {
                status: ScholarStatus.PENDING,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        role: true,
                        createdAt: true,
                    },
                },
                scholarLoginAttempts: {
                    orderBy: {
                        attemptedAt: 'desc',
                    },
                    take: 5, // Last 5 login attempts
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        const scholarsWithAttemptCount = pendingScholars.map(scholar => ({
            ...scholar,
            loginAttemptCount: scholar.scholarLoginAttempts.length,
        }));

        res.status(200).json({
            success: true,
            message: 'Pending scholars fetched successfully',
            data: {
                scholars: scholarsWithAttemptCount,
                total: pendingScholars.length,
            },
        });
    } catch (error) {
        console.error('Fetch pending scholars error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error while fetching pending scholars',
        });
    }
};

// Get scholar details by ID (for detailed review)
export const getScholarDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = getStringParam(req.params.id);

        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Scholar ID is required',
            });
            return;
        }

        const scholar = await prisma.scholar.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        role: true,
                        createdAt: true,
                    },
                },
                scholarLoginAttempts: {
                    orderBy: {
                        attemptedAt: 'desc',
                    },
                },
            },
        });

        if (!scholar) {
            res.status(404).json({
                success: false,
                message: 'Scholar not found',
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Scholar details fetched successfully',
            data: {
                scholar,
            },
        });
    } catch (error) {
        console.error('Fetch scholar details error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error while fetching scholar details',
        });
    }
};

// Approve scholar
export const approveScholar = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = getStringParam(req.params.id);
        const { adminNotes } = req.body; // Optional admin notes

        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Scholar ID is required',
            });
            return;
        }

        const scholar = await prisma.scholar.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                    },
                },
            },
        });

        if (!scholar) {
            res.status(404).json({
                success: false,
                message: 'Scholar not found',
            });
            return;
        }

        if (scholar.status === ScholarStatus.APPROVED) {
            res.status(400).json({
                success: false,
                message: 'Scholar is already approved',
            });
            return;
        }

        const adminId = req.user?.userId;

        const updatedScholar = await prisma.scholar.update({
            where: { id },
            data: {
                status: ScholarStatus.APPROVED,
                adminNotes: adminNotes || null,
                reviewedBy: adminId || null,
                reviewedAt: new Date(),
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        role: true,
                    },
                },
            },
        });

        console.log('✅ Scholar approved:', updatedScholar.user.email);

        res.status(200).json({
            success: true,
            message: 'Scholar approved successfully. They can now login and start answering questions.',
            data: {
                scholar: updatedScholar,
            },
        });
    } catch (error) {
        console.error('Approve scholar error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error while approving scholar',
        });
    }
};

// Reject scholar
export const rejectScholar = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = getStringParam(req.params.id);
        const { adminNotes, deleteAccount } = req.body; // adminNotes required, deleteAccount optional

        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Scholar ID is required',
            });
            return;
        }

        if (!adminNotes) {
            res.status(400).json({
                success: false,
                message: 'Please provide a reason for rejection (adminNotes)',
            });
            return;
        }

        const scholar = await prisma.scholar.findUnique({
            where: { id },
            include: {
                user: true,
            },
        });

        if (!scholar) {
            res.status(404).json({
                success: false,
                message: 'Scholar not found',
            });
            return;
        }

        if (scholar.status === ScholarStatus.APPROVED) {
            res.status(400).json({
                success: false,
                message: 'Cannot reject an already approved scholar',
            });
            return;
        }

        const adminId = req.user?.userId;

        if (deleteAccount) {
            // Option 1: Delete the entire account
            await prisma.scholar.delete({
                where: { id },
            });
            await prisma.user.delete({
                where: { id: scholar.userId },
            });

            console.log('🗑️ Scholar account deleted:', scholar.user.email);

            res.status(200).json({
                success: true,
                message: 'Scholar application rejected and account removed.',
            });
        } else {
            // Option 2: Mark as rejected but keep as regular user
            await prisma.scholar.update({
                where: { id },
                data: {
                    status: ScholarStatus.REJECTED,
                    adminNotes,
                    reviewedBy: adminId,
                    reviewedAt: new Date(),
                },
            });

            // Downgrade user role to USER
            await prisma.user.update({
                where: { id: scholar.userId },
                data: {
                    role: 'USER',
                },
            });

            console.log('❌ Scholar rejected, downgraded to user:', scholar.user.email);

            res.status(200).json({
                success: true,
                message: 'Scholar application rejected. User has been downgraded to regular user.',
            });
        }
    } catch (error) {
        console.error('Reject scholar error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error while rejecting scholar',
        });
    }
};

// Get scholar login attempts
export const getScholarLoginAttempts = async (req: Request, res: Response): Promise<void> => {
    try {
        const scholarId = getStringParam(req.params.scholarId);

        if (!scholarId) {
            res.status(400).json({
                success: false,
                message: 'Scholar ID is required',
            });
            return;
        }

        const attempts = await prisma.scholarLoginAttempt.findMany({
            where: {
                scholarId,
            },
            orderBy: {
                attemptedAt: 'desc',
            },
        });

        res.status(200).json({
            success: true,
            message: 'Login attempts fetched successfully',
            data: {
                attempts,
                total: attempts.length,
            },
        });
    } catch (error) {
        console.error('Fetch login attempts error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error while fetching login attempts',
        });
    }
};