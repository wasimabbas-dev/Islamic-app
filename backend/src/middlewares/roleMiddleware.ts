import { Request, Response, NextFunction } from 'express';
import { Role } from '@prisma/client';

export const requireRole = (...roles: Role[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: 'Authentication required.',
            });
            return;
        }

        if (!roles.includes(req.user.role)) {
            res.status(403).json({
                success: false,
                message: 'Forbidden: You do not have permission to access this resource.',
            });
            return;
        }

        next();
    };
};