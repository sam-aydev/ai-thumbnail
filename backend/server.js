import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import thumbnailRoutes from "./routes/thumbnail.routes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(cors({ origin: [process.env.CLIENT_URL,  ] }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongodb connected!"))
  .catch((err) => console.error("Mongodb err", err));

app.use("/api/auth", authRoutes);
app.use("/api/thumbnail", thumbnailRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is running on ${PORT}`));
