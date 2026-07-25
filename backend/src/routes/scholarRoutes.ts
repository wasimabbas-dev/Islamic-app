import { Router } from 'express';
import { getApprovedScholars, getScholarById } from '../controllers/scholarController';

const router = Router();

// Public routes - no authentication required
router.get('/', getApprovedScholars);
router.get('/:id', getScholarById);

export default router;  