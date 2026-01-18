import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  deleteThumbnail,
  generateThumbnail,
  getHistory,
} from "../controllers/thumbnailsController.js";

const router = express.Router();

router.post("/generate", verifyToken, generateThumbnail);
router.get("/history", verifyToken, getHistory);
router.delete("/:id", verifyToken, deleteThumbnail);

export default router;
