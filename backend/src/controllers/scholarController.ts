import { Request, Response } from 'express';
import prisma from '../config/db';

export const getApprovedScholars = async (req: Request, res: Response) => {
    try {
        const scholars = await prisma.scholar.findMany({
            where: {
                status: 'APPROVED'  // Only APPROVED scholars
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'  // Most recently created first
            }
        });

        console.log(`Found ${scholars.length} approved scholars`); // Debug log

        // Transform to match frontend Scholar type
        const transformedScholars = scholars.map(scholar => ({
            id: scholar.id.toString(),
            name: scholar.user.name,
            qualification: scholar.qualification,
            specialization: scholar.specialization || [],
            imageUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(scholar.user.name)}&background=7c3aed&color=fff&size=150`, // Generate avatar from name
            followers: 0,  // No followers system yet
            questionsAnswered: 0,  // No questions system yet
            rating: 0,  // No rating system yet
            bio: scholar.bio || '',
            education: scholar.qualification ? [scholar.qualification] : [],  // Use qualification as education
            recentAnswers: []  // No answers system yet
        }));

        res.json({
            success: true,
            scholars: transformedScholars,
            total: transformedScholars.length
        });
    } catch (error) {
        console.error('Error fetching scholars:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch scholars from database'
        });
    }
};

export const getScholarById = async (req: Request, res: Response): Promise<void> => {
    try {
        const idParam = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        const scholar = await prisma.scholar.findFirst({
            where: {
                id: idParam,
                status: 'APPROVED'  // Only if approved
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                }
            }
        });

        if (!scholar) {
            res.status(404).json({
                success: false,
                message: 'Scholar not found or not approved yet'
            });
            return;
        }

        const transformedScholar = {
            id: scholar.id.toString(),
            name: scholar.user.name,
            qualification: scholar.qualification,
            specialization: scholar.specialization || [],
            imageUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(scholar.user.name)}&background=7c3aed&color=fff&size=150`,
            followers: 0,
            questionsAnswered: 0,
            rating: 0,
            bio: scholar.bio || '',
            education: scholar.qualification ? [scholar.qualification] : [],
            recentAnswers: []
        };

        res.json({
            success: true,
            scholar: transformedScholar
        });
    } catch (error) {
        console.error('Error fetching scholar:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch scholar from database'
        });
    }
};