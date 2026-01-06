// backend/controllers/questioncontroller.js
import Question from "../models/questionModel.js";
import { User } from "../models/userModel.js";
import { checkBadges } from "../utils/badgeChecker.js";
import mongoose from "mongoose";

// Create a question
export const createQuestion = async (req, res) => {
  const { title, content, tags = [], subject, difficulty } = req.body;
  const mediaUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
  try {
    const q = await Question.create({
      title,
      content,
      tags: Array.isArray(tags)
        ? tags
        : tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
      subject,
      difficulty,
      mediaUrl,
      author: req.user?._id,
    });

    if (req.user && req.user._id)
      await User.findByIdAndUpdate(req.user._id, { $inc: { questions: 1 } });
    const user = await User.findById(req.user && req.user._id);
    checkBadges(user);
    await user.save();

    res.status(201).json(q);
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};

// List questions
export const listQuestions = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const sort = req.query.sort === "votes" ? { votes: -1 } : { createdAt: -1 };

  const filter = {};
  if (req.query.search) {
    filter.$or = [
      { title: new RegExp(req.query.search, "i") },
      { content: new RegExp(req.query.search, "i") },
      { tags: new RegExp(req.query.search, "i") },
    ];
  }
  if (req.query.subject) filter.subject = req.query.subject;

  try {
    const total = await Question.countDocuments(filter);
    const questions = await Question.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate("author", "name reputation badges")
      .lean();

    res.json({ data: questions, page, limit, total });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single question
export const getQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const q = await Question.findById(id).populate(
      "author",
      "name reputation badges"
    );
    if (!q) return res.status(404).json({ message: "Question not found" });

    q.views = (q.views || 0) + 1;
    await q.save();

    res.json({ question: q });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Vote on a question
export const voteQuestion = async (req, res) => {
  let { id } = req.params;
  if (!id) id = req.query.id;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid or missing question ID" });
  }

  const type = req.body.type || req.query.type;
  if (!type || !["up", "down"].includes(type)) {
    return res.status(400).json({ message: "type must be 'up' or 'down'" });
  }

  try {
    const q = await Question.findById(id);
    if (!q) return res.status(404).json({ message: "Question not found" });

    if (
      req.user &&
      q.author &&
      q.author.toString() === req.user._id.toString()
    ) {
      return res
        .status(400)
        .json({ message: "You cannot vote your own question" });
    }

    q.votes = (q.votes || 0) + (type === "up" ? 1 : -1);
    await q.save();

    const pointsToAdd = type === "up" ? 3 : -2;
    // update author's points if such a field exists
    await User.findByIdAndUpdate(q.author, { $inc: { points: pointsToAdd } });

    const authorUser = await User.findById(q.author);
    if (authorUser) {
      checkBadges(authorUser);
      await authorUser.save();
    }

    res.json({ votes: q.votes });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
