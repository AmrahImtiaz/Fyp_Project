import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    avatar: {
      type: String, // Google image OR uploaded image URL
    },

    rating: {
      type: Number,
      default: 1500, // LeetCode-style default
    },

    solved: {
      easy: { type: Number, default: 0 },
      medium: { type: Number, default: 0 },
      hard: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
)

export default mongoose.model("User", userSchema)
