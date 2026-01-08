import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  votes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const questionSchema = new mongoose.Schema({
  title: String,
  content: String,
  tags: [String],
  subject: String,
  difficulty: String,
  votes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  answersCount: { type: Number, default: 0 },
  answers: [
    {
      content: String,
      author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      votes: { type: Number, default: 0 },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });


export default mongoose.model('Question', questionSchema);
