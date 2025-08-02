import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  userId: { type: String, required: true }, 
  title: { type: String, required: true },
  description: String,
  deadline: String,
  category: String,
  status: { type: String, default: "In Progress" },
  reminderTime: { type: Date },

}, { timestamps: true });

export const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema);
