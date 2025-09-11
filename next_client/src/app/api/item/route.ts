import { getSession } from '@/lib/sessionStore';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    console.log("cookie", request.headers.get('cookie'));
    const cookie = request.headers.get('cookie')?.split('; ').find(c => c.startsWith('sessionId='));
    console.log("cookie", cookie);
    if (!cookie) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

    const sessionId = cookie.split("=")[1];
    const session = await getSession(sessionId);
    if (!session) return NextResponse.json({ error: "Session expired" }, { status: 401 });

    const response = await fetch(`${process.env.BACKEND_URL}/api/item/getAllItems`, {
        method: 'GET',
        headers: { 
            'Authorization': `Bearer ${session.accessToken}`,
        },
    });
    const data = await response.json();
    return NextResponse.json(data);
}