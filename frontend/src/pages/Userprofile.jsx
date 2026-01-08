import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Flame, Star, Upload } from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function Userprofile() {
  const [user, setUser] = useState({
    username: "",
    avatar: "",
    googleAvatar: "",
    streak: 0, // will now come from backend
  });

  const [stats, setStats] = useState({
    rank: 0,
    rating: 0,
    solved: 0,
    easy: 0,
    medium: 0,
    hard: 0,
  });

  const total = stats.easy + stats.medium + stats.hard;

  // Fetch user data from backend
  useEffect(() => {
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const res = await axios.get("/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data.user || res.data; // works for both cases

      setUser({
        username: data.username,
        avatar: data.avatar,
        googleAvatar: data.googleAvatar,
        streak: data.streak,
      });

      if (data.stats) setStats(data.stats);
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  };

  fetchUser();
}, []);

  const handleUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("avatar", file);

  try {
   
const token = localStorage.getItem("accessToken");

const res = await axios.get("/api/user/profile", {
  headers: {
    Authorization: `Bearer ${token}`,
  }
});

    if (res.data.success) {  

      setUser((prev) => ({
  ...prev,
  avatar: res.data.avatarUrl
}));

    }
  } catch (err) {
    console.error("Upload failed:", err);
  }
};


  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-4">
        <Card className="rounded-2xl shadow-md">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="relative">
              <Avatar>
  <AvatarImage src={user.avatar ? `${user.avatar}?t=${Date.now()}` : user.googleAvatar || "https://i.pravatar.cc/150"} />
  <AvatarFallback>RC</AvatarFallback>
</Avatar>

              <label className="absolute bottom-0 right-0 bg-white rounded-full p-1 cursor-pointer shadow-md">
                <Upload className="h-4 w-4 text-gray-600" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUpload}
                />
              </label>
            </div>
            <div className="flex-1">
              <CardTitle className="text-2xl">{user.username}</CardTitle>
              <div className="flex gap-2 mt-1">
                <Badge variant="secondary">Rank #{stats.rank}</Badge>
                <Badge variant="outline" className="flex gap-1 items-center">
                  <Star className="h-3 w-3" /> {stats.rating}
                </Badge>
              </div>
            </div>
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
                    <div className="text-muted-foreground text-sm">{user.streak} days</div>
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
      <Footer></Footer>
    </>
  );
}
