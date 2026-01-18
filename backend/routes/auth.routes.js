import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import { User } from "../models/User.js";

const router = express.Router();
const registervalidation = [
  body("username").trim().isLength({ min: 3 }).escape(),
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 6 }),
];

router.post("/register", registervalidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { username, email, password } = req.body;

  console.log(username, email);
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("existingUser", existingUser);

      return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    console.log("user", user);
    res
      .status(201)
      .json({ success: true, message: "User created successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(404).json({ message: "Invalid credentials!" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });
    res.json({
      success: true,
      token,
      user: {
        username: user.username,
        email: user.email,
        credits: user.credits,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

export default router;
