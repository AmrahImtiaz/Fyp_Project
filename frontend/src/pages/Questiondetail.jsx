import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUp, ArrowDown, MessageSquare, Share, Bookmark, Flag, Clock, Eye } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function QuestionDetailPage() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newAnswer, setNewAnswer] = useState("");
  const [userVote, setUserVote] = useState(null);

  // Fetch question from API
  useEffect(() => {
    const fetchQuestion = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8000/api/questions/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch");
        setQuestion(data.question || data);
        setUserVote(data.userVote || null); // set user's vote if API returns
      } catch (err) {
        console.error(err);
        setError("Failed to load question");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchQuestion();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error || !question) return <p className="text-center mt-10">Question not found</p>;

  // Handle voting
  const handleVote = async (direction) => {
    
    const token = localStorage.getItem("authToken");
if (!token) {
  alert("You must be logged in to post an answer");
  return;
}

const res = await fetch(`http://localhost:8000/api/questions/${id}/answers`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ content: newAnswer }),
});


      const data = await res.json();
      if (data.success) {
        setQuestion((prev) => ({ ...prev, votes: data.votes }));
        setUserVote(data.userVote);
      } else {
        alert(data.message || "Vote failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  // Submit new answer
  const handleSubmitAnswer = async () => {
    if (!newAnswer.trim()) return alert("Answer cannot be empty");

    const token = localStorage.getItem("authToken");
    if (!token) return alert("You must be logged in to post an answer");

    try {
      const res = await fetch(`http://localhost:8000/api/questions/${id}/answers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newAnswer }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setQuestion((prev) => ({
          ...prev,
          answers: [...(prev.answers || []), data.answer],
          answersCount: (prev.answersCount || 0) + 1,
        }));
        setNewAnswer("");
      } else {
        alert(data.message || "Failed to submit answer");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase();
  };

  const getDifficultyColor = (level) => {
    switch (level) {
      case "Beginner": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Intermediate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Advanced": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Question */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Card className="mb-8">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h1 className="text-2xl md:text-3xl font-bold mb-4">{question.title}</h1>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> {question.createdAt ? new Date(question.createdAt).toLocaleDateString() : "-"}</div>
                      <div className="flex items-center gap-1"><Eye className="w-4 h-4" /> {question.views} views</div>
                      <div className="flex items-center gap-1"><MessageSquare className="w-4 h-4" /> {question.answers?.length || 0} answers</div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className={getDifficultyColor(question.difficulty)}>{question.difficulty}</Badge>
                      <Badge variant="outline">{question.subject}</Badge>
                      {question.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                    </div>
                  </div>

                  {/* Voting */}
                  <div className="flex flex-col items-center ml-4">
                    <Button variant="ghost" size="icon" onClick={() => handleVote("up")} className={userVote === "up" ? "text-green-600" : ""}><ArrowUp /></Button>
                    <span className="my-1 font-semibold">{question.votes}</span>
                    <Button variant="ghost" size="icon" onClick={() => handleVote("down")} className={userVote === "down" ? "text-red-600" : ""}><ArrowDown /></Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="whitespace-pre-wrap mb-6">{question.content}</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Answers */}
          <Card className="mb-8">
            <CardHeader><CardTitle>{question.answers?.length || 0} Answers</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              {question.answers && question.answers.length > 0 ? question.answers.map((a, i) => (
                <div key={i} className="border-b pb-4">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center"><ArrowUp className="w-4 h-4 mb-1"/><span>{a.votes || 0}</span><ArrowDown className="w-4 h-4 mt-1"/></div>
                    <div className="flex-1">
                      <p className="mb-2">{a.content}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Avatar className="h-6 w-6"><AvatarImage src={a.author?.avatar} /><AvatarFallback>{a.author?.name?.[0] || "?"}</AvatarFallback></Avatar>
                        <span>{a.author?.name || "Unknown"}</span>
                        <Clock className="w-3 h-3 ml-2"/>
                        <span>{a.createdAt ? new Date(a.createdAt).toLocaleDateString() : "-"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )) : <p>No answers yet. Be the first to answer!</p>}
            </CardContent>
          </Card>

          {/* Add Answer */}
          <Card>
            <CardHeader><CardTitle>Your Answer</CardTitle></CardHeader>
            <CardContent>
              <Textarea placeholder="Write your answer here..." value={newAnswer} onChange={e => setNewAnswer(e.target.value)} className="mb-4"/>
              <Button onClick={handleSubmitAnswer}>Post Your Answer</Button>
            </CardContent>
          </Card>

        </div>
      </div>
    </>
  );
}
