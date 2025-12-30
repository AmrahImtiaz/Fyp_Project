import { useState } from "react"
import { motion } from "framer-motion"
import Footer from "../components/Footer"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Search, ArrowUp, ArrowDown, MessageSquare, Clock } from "lucide-react"
import { Link } from "react-router-dom"
import Navbar from "@/components/Navbar"

export default function BrowseQuestionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [filterBy, setFilterBy] = useState("all")

  const questions = [
    {
      id: "1",
      title: "How do I solve systems of linear equations with matrices?",
      content: "I'm trying to understand how to use matrices to solve systems of linear equations...",
      author: { name: "John Doe", avatar: "/placeholder.svg", reputation: 1250 },
      tags: ["mathematics", "linear-algebra", "matrices"],
      votes: 15,
      answers: 3,
      views: 234,
      createdAt: new Date(Date.now() - 86400000),
      difficulty: "Intermediate",
      subject: "Mathematics",
    },
    {
      id: "2",
      title: "What are the key principles of object-oriented programming?",
      content: "I'm new to programming and want to understand OOP concepts better...",
      author: { name: "Sarah Smith", avatar: "/placeholder.svg", reputation: 890 },
      tags: ["programming", "oop", "computer-science"],
      votes: 23,
      answers: 5,
      views: 456,
      createdAt: new Date(Date.now() - 172800000),
      difficulty: "Beginner",
      subject: "Computer Science",
    },
    {
      id: "3",
      title: "How does photosynthesis work in plants?",
      content: "Can someone explain the process of photosynthesis and its importance in the ecosystem?",
      author: { name: "Mike Johnson", avatar: "/placeholder.svg", reputation: 2100 },
      tags: ["biology", "photosynthesis", "plants"],
      votes: 18,
      answers: 7,
      views: 678,
      createdAt: new Date(Date.now() - 259200000),
      difficulty: "Intermediate",
      subject: "Biology",
    },
    {
      id: "4",
      title: "Understanding quantum mechanics basics",
      content: "I'm struggling with the fundamental concepts of quantum mechanics. Can someone help explain wave-particle duality?",
      author: { name: "Emily Chen", avatar: "/placeholder.svg", reputation: 1750 },
      tags: ["physics", "quantum-mechanics", "wave-particle-duality"],
      votes: 31,
      answers: 4,
      views: 892,
      createdAt: new Date(Date.now() - 345600000),
      difficulty: "Advanced",
      subject: "Physics",
    },
  ]

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800"
      case "Intermediate": return "bg-yellow-100 text-yellow-800"
      case "Advanced": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch =
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesFilter = filterBy === "all" || q.subject.toLowerCase() === filterBy.toLowerCase()
    return matchesSearch && matchesFilter
  })

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Browse Questions</h1>
              <p className="text-gray-500">Explore questions from our learning community</p>
            </div>
            <Link to="/ask-question">
              <Button className="mt-4 md:mt-0">
                <MessageSquare className="w-4 h-4 mr-2" />
                Ask Question
              </Button>
            </Link>
          </div>
          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search questions, tags, or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="most-votes">Most Votes</SelectItem>
                <SelectItem value="most-answers">Most Answers</SelectItem>
                <SelectItem value="most-views">Most Views</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="mathematics">Mathematics</SelectItem>
                <SelectItem value="computer science">Computer Science</SelectItem>
                <SelectItem value="physics">Physics</SelectItem>
                <SelectItem value="biology">Biology</SelectItem>
                <SelectItem value="chemistry">Chemistry</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Questions List */}
        <div className="space-y-4">
          {filteredQuestions.map((question, index) => (
            <motion.div key={question.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }}>
              <Card className="hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Votes */}
                    <div className="flex flex-col items-center space-y-2 min-w-[60px]">
                      <Button variant="ghost" size="icon" className="h-8 w-8"><ArrowUp className="w-4 h-4" /></Button>
                      <span className="font-semibold text-lg">{question.votes}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8"><ArrowDown className="w-4 h-4" /></Button>
                      <div className="text-xs text-gray-400 text-center">votes</div>
                    </div>

                    {/* Answers & Views */}
                    <div className="flex flex-col items-center space-y-2 min-w-[60px]">
                      <div className="text-lg font-semibold">{question.answers}</div>
                      <div className="text-xs text-gray-400 text-center">answers</div>
                      <div className="text-sm text-gray-400">{question.views}</div>
                      <div className="text-xs text-gray-400 text-center">views</div>
                    </div>

                    {/* Question Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <Link to={`/questions/${question.id}`}>
                          <h3 className="text-lg font-semibold hover:text-blue-600 cursor-pointer">{question.title}</h3>
                        </Link>
                        <div className="flex items-center gap-2">
                          <Badge className={getDifficultyColor(question.difficulty)}>{question.difficulty}</Badge>
                          <Badge variant="outline">{question.subject}</Badge>
                        </div>
                      </div>

                      <p className="text-gray-500 mb-3 line-clamp-2">{question.content}</p>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {question.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={question.author.avatar || "/placeholder.svg"} alt={question.author.name} />
                            <AvatarFallback>{question.author.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                          </Avatar>
                          <div className="text-sm">
                            <span className="font-medium">{question.author.name}</span>
                            <span className="text-gray-400 ml-1">({question.author.reputation} rep)</span>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <Clock className="w-4 h-4 mr-1" />
                          {question.createdAt.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No questions found */}
        {filteredQuestions.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <div className="text-gray-400 mb-4">No questions found matching your criteria.</div>
            <Link to="/ask-question">
              <Button>Ask the First Question</Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
    <Footer />
    </>)
}
