import { Router } from 'express';
import {
    getPendingScholars,
    getScholarDetails,
    approveScholar,
    rejectScholar,
    getScholarLoginAttempts,
} from '../controllers/adminController';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { requireRole } from '../middlewares/roleMiddleware';
import { Role } from '@prisma/client';

const router: Router = Router();

// All admin routes require authentication and ADMIN role
router.use(authenticateJWT);
router.use(requireRole(Role.ADMIN));

// Scholar management
router.get('/scholars/pending', getPendingScholars);
router.get('/scholars/:id', getScholarDetails);
router.get('/scholars/:scholarId/login-attempts', getScholarLoginAttempts);
router.patch('/scholars/:id/approve', approveScholar);
router.patch('/scholars/:id/reject', rejectScholar);

export default router;