import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    const envUser = process.env.ADMIN_USER || 'admin';
    const envPass = process.env.ADMIN_PASS || 'adminpassword123';

    if (username === envUser && password === envPass) {
      return NextResponse.json({
        success: true,
        token: 'um-digital-admin-session-token-' + Date.now(),
        user: { name: 'Admin', role: 'Super Admin' },
      });
    }

    return NextResponse.json({ error: 'Invalid admin username or password' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Authentication server error' }, { status: 500 });
  }
}
