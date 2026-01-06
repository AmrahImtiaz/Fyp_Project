import express from "express";
import multer from "multer";
import { User } from "../models/userModel.js"; // ✅ fixed import
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/upload-avatar",
  isAuthenticated,
  upload.single("avatar"),
  async (req, res) => {
    try {
      const userId = req.user.id;
      const avatarUrl = `/uploads/${req.file.filename}`;

      const user = await User.findByIdAndUpdate(
        userId,
        { avatar: avatarUrl },
        { new: true }
      );

      res.json({ avatarUrl: user.avatar });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

export default router;
