import prisma from './config/db';
import bcrypt from 'bcryptjs';

async function setupAdmin() {
    try {
        const email = 'admin@darulhuda.com';

        // Delete existing admin if any
        await prisma.user.deleteMany({ where: { email } }).catch(() => { });

        const hash = await bcrypt.hash('admin123', 10);
        const admin = await prisma.user.create({
            data: {
                email,
                password: hash,
                name: 'Admin User',
                role: 'ADMIN',
            },
        });

        console.log('✅ Admin created successfully!');
        console.log('   Email:', admin.email);
        console.log('   Password: admin123');
        console.log('   Role:', admin.role);

        await prisma.$disconnect();
    } catch (error) {
        console.error('Error:', error);
        await prisma.$disconnect();
        process.exit(1);
    }
}

setupAdmin();