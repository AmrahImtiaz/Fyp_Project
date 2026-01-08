import { useState } from "react"
import { useNavigate } from "react-router-dom" // ✅ top-level import
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { motion } from "framer-motion"
import { Upload, X, Plus, HelpCircle, FileText, ImageIcon, Video } from "lucide-react"

import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Label } from "../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"

export default function AskQuestionPage() {
  const navigate = useNavigate() // ✅ define here at top-level of component

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState("")
  const [subject, setSubject] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState([])

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag) && tags.length < 5) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag))
  }


const handleFileUpload = (e) => {
  const files = Array.from(e.target.files || [])

  const validFiles = []

  for (let file of files) {
    // ❌ size check (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert(`${file.name} is larger than 5MB`)
      continue
    }

    // ❌ type check (PNG / JPEG only)
    if (
      file.type !== "image/png" &&
      file.type !== "image/jpeg"
    ) {
      alert(`${file.name} is not a PNG or JPEG`)
      continue
    }

    // ✅ file is valid
    validFiles.push(file)
  }

  setUploadedFiles((prev) => [...prev, ...validFiles])
}

  
  const handleRemoveFile = (index) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("content", content)
      formData.append("subject", subject)
      formData.append("difficulty", difficulty)
      // send tags as a single comma-separated string so backend can split
      if (tags.length) formData.append("tags", tags.join(","))
      
        uploadedFiles.forEach((file) => {
  formData.append("media", file)
})


      const accessToken = localStorage.getItem("accessToken")
      if (!accessToken) {
        alert("Please log in to post a question.")
        return
      }
      const headers = { Authorization: `Bearer ${accessToken}` }

      const res = await fetch("http://localhost:8000/api/questions", {
        method: "POST",
        credentials: "include",
        headers,
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.message)

      navigate("/browsequestions") // ✅ redirect after successful post
    } catch (err) {
      alert(err.message)
    }
  }

  const getFileIcon = (file) => {
    if (file.type.startsWith("image/")) return <ImageIcon className="w-4 h-4" />
    if (file.type.startsWith("video/")) return <Video className="w-4 h-4" />
    return <FileText className="w-4 h-4" />
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-3xl font-bold mb-2">Ask a Question</h1>
            <p className="text-muted-foreground mb-8">Get help from the community</p>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Question Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Title */}
                    <div>
                      <Label>Title</Label>
                      <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter question title" />
                    </div>

                    {/* Content */}
                    <div>
                      <Label>Question Content</Label>
                      <Textarea className="min-h-[200px]" value={content} onChange={(e) => setContent(e.target.value)} />
                    </div>

                    {/* File Upload (optional) */}
                    <div>
                      <Label>Media & Files (optional)</Label>
                      <input type="file" multiple onChange={handleFileUpload} className="hidden" id="file-upload" />
                      <label htmlFor="file-upload" className="border-2 border-dashed rounded-lg p-6 block text-center cursor-pointer">
                        <Upload className="mx-auto mb-2" />
                        Click to upload files (optional)
                      </label>
                    </div>

                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex justify-between items-center bg-muted p-2 rounded">
                        <div className="flex items-center gap-2">{getFileIcon(file)}<span>{file.name}</span></div>
                        <Button size="icon" variant="ghost" onClick={() => handleRemoveFile(index)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}

                    {/* Tags (optional) */}
                    <div>
                      <Label>Tags (optional)</Label>
                      <div className="flex gap-2">
                        <Input placeholder="Enter tag (optional)" value={newTag} onChange={(e) => setNewTag(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAddTag()} />
                        <Button variant="outline" onClick={handleAddTag}><Plus className="w-4 h-4" /></Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {tags.map(tag => (
                          <Badge key={tag}>
                            {tag}
                            <X className="ml-1 w-3 h-3 cursor-pointer" onClick={() => handleRemoveTag(tag)} />
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Selects */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <Select value={subject} onValueChange={setSubject}>
                        <SelectTrigger><SelectValue placeholder="Select Subject" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Computer Science">Computer Science</SelectItem>
                          <SelectItem value="Mathematics">Mathematics</SelectItem>
                          <SelectItem value="Physics">Physics</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={difficulty} onValueChange={setDifficulty}>
                        <SelectTrigger><SelectValue placeholder="Difficulty" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button className="w-full" disabled={!title || !content} onClick={handleSubmit}>
                      Post Question
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><HelpCircle className="w-5 h-5" />Tips</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>• Be specific</p>
                  <p>• Show what you tried</p>
                  <p>• Add context</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}
