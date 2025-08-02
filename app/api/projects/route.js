import { NextResponse } from "next/server";
import { connectDB } from '../lib/db';
import { Project } from "../lib/project";


export async function GET(req) {
  try {
    const userId = req.headers.get("userId");
    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    await connectDB();
    const projects = await Project.find({ userId });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function POST(req) {
  try {
    const body = await req.json();
    const { title, description, deadline, category, status, userId } = body;

    if (!userId || !title) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectDB();
    const newProject = await Project.create({
      title,
      description,
      deadline,
      category,
      status,
      userId,
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
