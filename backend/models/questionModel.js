import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  votes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: String }],
  subject: { type: String },
  difficulty: { type: String },
  mediaUrl: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  votes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  answersCount: { type: Number, default: 0 },
  answers: [answerSchema], // ✅ ADD THIS
}, { timestamps: true });

export default mongoose.model('Question', questionSchema);
