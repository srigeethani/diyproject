import { NextResponse } from "next/server";
import { connectDB } from '../lib/db';
import { Project } from "../lib/project";


export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const updatedData = await req.json();

    await connectDB();

    const updatedProject = await Project.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Remove project
export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    await connectDB();

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Project deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
