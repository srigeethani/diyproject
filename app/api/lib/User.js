import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: () => uuidv4(),
    unique: true,
  },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
