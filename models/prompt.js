import mongoose, { Schema, models, model } from "mongoose";

const PromptSchema = new Schema({
  creator: {
    type: mongoose.Types.ObjectId,
    required: [true, "Creator is required"],
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required"],
  },
  tag: {
    type: String,
    required: [true, "Tag is required"],
  },
});

const Prompt = models.Prompt || model("Prompt", PromptSchema);
export default Prompt;
