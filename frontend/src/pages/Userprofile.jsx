import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Trophy, Flame, Star } from "lucide-react"
import Navbar from "../components/Navbar"

export default function Userprofile() {
  const stats = {
    username: "raiden_codes",
    rank: 12456,
    rating: 1780,
    solved: 542,
    easy: 220,
    medium: 260,
    hard: 62,
    streak: 43,
  }

  const total = stats.easy + stats.medium + stats.hard

  return (
    <>
    <Navbar />
    <div className="max-w-4xl mx-auto p-4">
      <Card className="rounded-2xl shadow-md">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="https://i.pravatar.cc/150" />
            <AvatarFallback>RC</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-2xl">{stats.username}</CardTitle>
            <div className="flex gap-2 mt-1">
              <Badge variant="secondary">Rank #{stats.rank}</Badge>
              <Badge variant="outline" className="flex gap-1 items-center">
                <Star className="h-3 w-3" /> {stats.rating}
              </Badge>
            </div>
          </div>
          {/* <Button variant="outline">View Profile</Button> */}
        </CardHeader>

        <CardContent className="grid md:grid-cols-2 gap-6">
          {/* Solved Stats */}
          <Card className="rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg">Problems Solved</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-3xl font-bold">{stats.solved}</div>

              <div>
                <div className="flex justify-between text-sm">
                  <span>Easy</span>
                  <span>{stats.easy}</span>
                </div>
                <Progress value={(stats.easy / total) * 100} />
              </div>

              <div>
                <div className="flex justify-between text-sm">
                  <span>Medium</span>
                  <span>{stats.medium}</span>
                </div>
                <Progress value={(stats.medium / total) * 100} />
              </div>

              <div>
                <div className="flex justify-between text-sm">
                  <span>Hard</span>
                  <span>{stats.hard}</span>
                </div>
                <Progress value={(stats.hard / total) * 100} />
              </div>
            </CardContent>
          </Card>

          {/* Activity */}
          <Card className="rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg">Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Flame className="text-orange-500" />
                <div>
                  <div className="font-semibold">Current Streak</div>
                  <div className="text-muted-foreground text-sm">{stats.streak} days</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Trophy className="text-yellow-500" />
                <div>
                  <div className="font-semibold">Achievements</div>
                  <div className="text-muted-foreground text-sm">Top 5% Global</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
</>
  )
}
