import OpenAI from "openai";
import { Thumbnail } from "../models/Thumbnail.js";
import { User } from "../models/User.js";

import dotenv from "dotenv";
import cloudinary from "../config/cloudinary.js";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateThumbnail = async (req, res) => {
  const { title, style } = req.body;
  console.log("Title", title, "Style", style);
  console.log(title, style);
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);
    if (user.credits < 1) {
      return res
        .status(402)
        .json({ success: false, message: "Insufficient credits" });
    }

    const completion = await openai.chat.completions.create({
      model: "chatgpt-4o-latest",
      messages: [
        {
          role: "system",
          content:
            "You are an expert visual director for Youtube thumnails. you ouput only the raw physical description for an image generator.",
        },
        {
          role: "user",
          content: `A professional 16:9 YouTube thumbnail in a ${style} style. 
      The image should feature the text "${title}" in large, bold, 3D letters. 
      Ensure the layout is clean with the text as the primary focus. Make sure the design looks human`,
        },
      ],
    });
    const enhancedPrompt = completion.choices[0].message.content;

    console.log(enhancedPrompt);
    const result = await openai.images.generate({
      model: "gpt-image-1.5",
      prompt: enhancedPrompt,
    });

    const image_base64 = result.data[0].b64_json;
    console.log(image_base64);
    const uploadResponse = await cloudinary.uploader
      .upload(`data:image/png;base64,${image_base64}`, {
        folder: "ai-thumbnails",
        public_id: `thumb_${userId}_${Date.now()}`,
        resource_type: "image",
      })
      .catch((error) => {
        console.log(error);
      });
    const imageUrl = uploadResponse.secure_url;
    console.log(imageUrl);

    const newThumbanil = await Thumbnail.create({
      userId,
      title,
      style,
      enhancedPrompt,
      imageUrl,
      cloudinaryId: uploadResponse.public_id,
    });
    await User.findByIdAndUpdate(userId, { $inc: { credits: -1 } });
    res.status(200).json({
      success: true,
      data: newThumbanil,
      creditsLeft: user.credits - 1,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "AI generation failed",
      error: error.message,
    });
  }
};

export const getHistory = async (req, res) => {
  try {
    const history = await Thumbnail.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    console.log(history, "nothing");
    res.status(200).json({ success: true, data: history });
  } catch (error) {
    res.status(500).json({ success: false, message: "fetch failed!" });
  }
};

export const deleteThumbnail = async (req, res) => {
  try {
    const history = await Thumbnail.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    res.status(200).json({ success: true, message: "Deleted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "delete failed!" });
  }
};
