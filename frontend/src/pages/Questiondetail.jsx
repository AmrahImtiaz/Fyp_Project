import { useParams } from "react-router-dom"

export default function QuestionDetailPage() {
  const { id } = useParams()  // id from URL
  const questions = [
    { id: "1", title: "Linear Algebra Question", content: "Content of Q1" },
    { id: "2", title: "OOP Question", content: "Content of Q2" },
    { id: "3", title: "Photosynthesis Question", content: "Content of Q3" }
  ]

  const question = questions.find(q => q.id === id)

  if (!question) return <div>Question not found!</div>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{question.title}</h1>
      <p>{question.content}</p>
    </div>
  )
}
