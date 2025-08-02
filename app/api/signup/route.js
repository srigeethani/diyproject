import { connectDB } from "../lib/db";     
import User from "../lib/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { username, password } = await req.json();
    await connectDB();

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "Username already exists" }), {
        status: 400,
      });
    }

  
    const userCount = await User.countDocuments();
    const userId = `UID${userCount + 1}`;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      userId,
      username,
      password: hashedPassword,
    });

    return new Response(
      JSON.stringify({ message: "Signup successful", userId: newUser.userId }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}