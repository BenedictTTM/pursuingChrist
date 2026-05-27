import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;

        // Ensure both fields are provided
        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        // Query the database for the admin record
        // In our simplistic setup, any email is allowed if the master password matches the DB record
        const admin = await prisma.admin.findFirst({
            where: {
                password: password,
            },
        });

        if (!admin) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // Return a mock success token
        return NextResponse.json({ success: true, token: 'admin_token_' + Date.now() });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
