import { NextResponse } from 'next/server';
import { connectDB } from '../lib/db';  
import User from '../lib/User';         

import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    await connectDB();

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: 'Invalid password' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Login successful',
        userId: existingUser.userId, // use .userId if you auto-generated UID1, UID2...
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
