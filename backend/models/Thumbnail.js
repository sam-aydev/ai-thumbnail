import mongoose from "mongoose";

const ThumbnailSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    style: {
      type: String,
      required: true,
    },
    enhancedPrompt: {
      type: String,
    },
    imageUrl: { type: String, required: true },
    cloudinaryId: { type: String },
  },
  { timestamps: true }
);

export const Thumbnail = mongoose.model("Thumbnail", ThumbnailSchema);
