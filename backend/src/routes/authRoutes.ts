import { Router } from 'express';
import {
    registerUser,
    registerScholar,
    login,
} from '../controllers/authController';

const router: Router = Router();

// Regular user registration
router.post('/register', registerUser);

// Scholar registration
router.post('/register-scholar', registerScholar);

// Login
router.post('/login', login);

export default router;