import { z } from 'zod';

export const registerUserSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    name: z.string().min(2, 'Name must be at least 2 characters'),
});

export const registerScholarSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    phoneNumber: z.string().min(10, 'Valid phone number is required'),
    bio: z.string().min(50, 'Please provide a detailed bio (minimum 50 characters)'),
    qualification: z.string().min(3, 'Qualification is required'),
    specialization: z.string().min(3, 'Area of specialization is required'),
    experience: z.string().min(10, 'Please describe your experience (minimum 10 characters)'),
    sanadUrl: z.string().url('Please provide a valid URL to your sanad/certificate').optional(),
    additionalDocs: z.string().optional(),
});

export const loginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(1, 'Password is required'),
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type RegisterScholarInput = z.infer<typeof registerScholarSchema>;
export type LoginInput = z.infer<typeof loginSchema>;