import { NextResponse } from 'next/server';
import { RegisterBuyerParams } from './param';

export async function POST(request: Request) {
    const { firstName, lastName, email, phone, password }: RegisterBuyerParams = await request.json();

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/registerBuyer`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, phone, password }),
    });

    if (response.ok) {
        return NextResponse.json({ message: 'User registered successfully' });
    } else {
        const errorData = await response.json();
        return NextResponse.json({ message: errorData.message || 'Registration failed' }, { status: 400 });
    }
}