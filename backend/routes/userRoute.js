import express from "express";
import { User } from "../models/userModel.js";
import { changePassword, forgotPassword, loginUser, logoutUser, registerUser, verification, verifyOTP } from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { userSchema, validateUser } from "../validators/userValidate.js";
import avatarRoutes from "./avatarRoutes.js"; // optional if you want to combine

const router = express.Router();

// ----- Auth/User routes -----
router.post('/register', validateUser(userSchema), registerUser);
router.post('/verify', verification);
router.post('/login', loginUser);
router.post('/logout', isAuthenticated, logoutUser);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp/:email', verifyOTP);
router.post('/change-password/:email', changePassword);

// ----- Profile route -----
router.get("/profile", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const stats = {
      rank: 0, // optional, you can calculate real rank later
      rating: user.rating || 0,
      solved: user.solved.easy + user.solved.medium + user.solved.hard,
      easy: user.solved.easy,
      medium: user.solved.medium,
      hard: user.solved.hard,
    };

    res.json({
      username: user.username,
      avatar: user.avatar,
      googleAvatar: user.googleAvatar,
      streak: user.streak || 0,
      stats,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ----- Export the router -----
export default router;
