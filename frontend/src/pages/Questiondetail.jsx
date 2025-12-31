import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUp, ArrowDown, MessageSquare, Share, Bookmark, Flag, Clock, Eye, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function QuestionDetailPage() {
  const { id } = useParams(); // React Router param
  const [newAnswer, setNewAnswer] = useState("");
  const [userVote, setUserVote] = useState(null);

  const questionList = [
    {
      id: 1,
      title: "How do I solve systems of linear equations with matrices?",
      content: `I'm trying to understand how to use matrices to solve systems of linear equations. I have the following system:

2x + 3y = 7
4x - y = 1

I know I need to set this up as a matrix equation Ax = b, but I'm not sure about the next steps. Can someone walk me through the process of using Gaussian elimination or matrix inversion to solve this?

I've tried setting up the augmented matrix:
[2  3 | 7]
[4 -1 | 1]

But I'm not sure how to proceed from here. Any help would be greatly appreciated!`,
      author: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=40&width=40",
        reputation: 1250,
        badges: ["Student", "Curious"],
      },
      tags: ["mathematics", "linear-algebra", "matrices", "systems-of-equations"],
      votes: 15,
      views: 234,
      answers: 3,
      createdAt: new Date(Date.now() - 86400000),
      difficulty: "Intermediate",
      subject: "Mathematics",
    },
    {
      id: 2,
      title: "What is the difference between speed and velocity?",
      content: `I am confused between speed and velocity. They seem similar, but I know there is a difference in physics. Can someone explain with simple examples?`,
      author: {
        name: "Mary Jane",
        avatar: "/placeholder.svg?height=40&width=40",
        reputation: 890,
        badges: ["Physics Learner"],
      },
      tags: ["physics", "motion", "velocity", "speed"],
      votes: 10,
      views: 150,
      answers: 2,
      createdAt: new Date(Date.now() - 50000000),
      difficulty: "Beginner",
      subject: "Physics",
    },
    {
      id: 3,
      title: "How does the internet work?",
      content: `I want to understand how the internet actually works. What happens when I type a URL and press enter? How does the data reach my browser?`,
      author: {
        name: "Alex Turner",
        avatar: "/placeholder.svg?height=40&width=40",
        reputation: 1050,
        badges: ["Tech Curious"],
      },
      tags: ["technology", "internet", "networking"],
      votes: 22,
      views: 320,
      answers: 5,
      createdAt: new Date(Date.now() - 70000000),
      difficulty: "Intermediate",
      subject: "Computer Science",
    },
  ];

  const questionId = parseInt(id, 10);
  const question = questionList.find((q) => q.id === questionId);

  if (!question) return <p className="text-center mt-10">Question not found.</p>;

  const answers = [
    {
      id: "1",
      content: `Great question! Let me walk you through solving this system using Gaussian elimination...`,
      author: {
        name: "Dr. Sarah Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        reputation: 4250,
        badges: ["Expert", "Educator", "Top Contributor"],
      },
      votes: 23,
      isAccepted: true,
      createdAt: new Date(Date.now() - 43200000),
      comments: [
        {
          id: "c1",
          content: "This is exactly what I needed! The step-by-step breakdown really helps.",
          author: {
            name: "John Doe",
            avatar: "/placeholder.svg?height=32&width=32",
          },
          createdAt: new Date(Date.now() - 21600000),
        },
      ],
    },
    {
      id: "2",
      content: `Another approach is to use matrix inversion...`,
      author: {
        name: "Mike Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        reputation: 2890,
        badges: ["Helper", "Mathematics"],
      },
      votes: 12,
      isAccepted: false,
      createdAt: new Date(Date.now() - 32400000),
      comments: [],
    },
    {
      id: "3",
      content: `For a more intuitive understanding, you can also think of this geometrically...`,
      author: {
        name: "Alex Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        reputation: 1560,
        badges: ["Student", "Helper"],
      },
      votes: -2,
      isAccepted: false,
      createdAt: new Date(Date.now() - 18000000),
      comments: [
        {
          id: "c2",
          content: "I think there might be an error in your substitution. Could you double-check?",
          author: {
            name: "Emma Davis",
            avatar: "/placeholder.svg?height=32&width=32",
          },
          createdAt: new Date(Date.now() - 14400000),
        },
      ],
    },
  ];

  const handleVote = (direction) => {
    setUserVote(userVote === direction ? null : direction);
  };

  const handleSubmitAnswer = () => {
    if (newAnswer.trim()) {
      console.log("Submitting answer:", newAnswer);
      setNewAnswer("");
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Question Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{question.title}</h1>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        Asked {question.createdAt ? new Date(question.createdAt).toLocaleDateString() : "-"}
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {question.views} views
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        {question.answers} answers
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className={getDifficultyColor(question.difficulty)}>{question.difficulty}</Badge>
                      <Badge variant="outline">{question.subject}</Badge>
                      {question.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-center ml-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleVote("up")}
                      className={userVote === "up" ? "text-green-600" : ""}
                    >
                      <ArrowUp className="w-5 h-5" />
                    </Button>
                    <span className="font-semibold text-lg my-1">{question.votes}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleVote("down")}
                      className={userVote === "down" ? "text-red-600" : ""}
                    >
                      <ArrowDown className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray dark:prose-invert max-w-none mb-6">
                  <p className="whitespace-pre-wrap">{question.content}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button variant="outline" size="sm">
                      <Share className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm">
                      <Bookmark className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" size="sm">
                      <Flag className="w-4 h-4 mr-2" />
                      Flag
                    </Button>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={question.author.avatar || "/placeholder.svg"} alt={question.author.name} />
                      <AvatarFallback>
                        {question.author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">{question.author.name}</div>
                      <div className="text-xs text-muted-foreground">{question.author.reputation} reputation</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* The rest of your Answers & Add Answer sections remain unchanged, but make sure to use optional chaining for dates: */}
          {/* Example for answer comment date: */}
          {/* {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : "-"} */}
        </div>
      </div>
    </>
  );
}
