import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';

interface JwtPayload {
    userId: string;
    role: Role;
}

export const authenticateJWT = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const authHeader: string | undefined = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.',
            });
            return;
        }

        const token: string = authHeader.split(' ')[1];

        if (!token) {
            res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.',
            });
            return;
        }

        const jwtSecret: string = process.env.JWT_SECRET || 'default-secret-key';
        const decoded: JwtPayload = jwt.verify(token, jwtSecret) as JwtPayload;

        req.user = {
            userId: decoded.userId,
            role: decoded.role,
        };

        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.status(401).json({
                success: false,
                message: 'Token has expired.',
            });
            return;
        }

        if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({
                success: false,
                message: 'Invalid token.',
            });
            return;
        }

        res.status(500).json({
            success: false,
            message: 'Internal server error during authentication.',
        });
        return;
    }
};