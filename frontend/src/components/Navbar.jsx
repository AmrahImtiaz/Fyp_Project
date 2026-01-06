import { BookA, BookOpen, LogOut, User } from 'lucide-react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import React, { useState, useRef } from "react";
import axios from "axios";
import { toast } from "sonner";

import { Link } from 'react-router-dom'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { getData } from '@/context/userContext'
const Navbar = () => {
  const [showSearchHelp, setShowSearchHelp] = useState(false);
const searchRef = useRef(null);

    const {user, setUser} = getData()
    const accessToken = localStorage.getItem("accessToken")
    console.log(user);

    const logoutHandler = async()=>{
        try {
            const res = await axios.post(`http://localhost:8000/user/logout`,{},{
                headers:{
                    Authorization:`Bearer ${accessToken}`
                }
            })
            if(res.data.success){
                setUser(null)
                toast.success(res.data.message)
                localStorage.clear()
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    
    return (
  <nav className="p-2 border-b border-gray-200 bg-transparent">
    <div className="max-w-7xl mx-auto flex justify-between items-center">

      {/* Logo + Search */}
      <div className="flex gap-4 items-center">
        <BookOpen className="h-6 w-6 text-blue-800" />

        <h1 className="font-bold text-xl">
          <Link to="/" className="flex items-center gap-1">
            <span className="text-blue-600">Learn</span>
            <span>Stack</span>
          </Link>
        </h1>

        <div className="relative w-[420px]" ref={searchRef}>
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

  <Input
    placeholder="Search..."
    className="pl-9"
    onFocus={() => setShowSearchHelp(true)}
  />

  {/* Dropdown Help Panel */}
  {showSearchHelp && (
    <div className="absolute mt-2 w-full rounded-md border bg-white shadow-lg z-50 text-sm">
      
      <div className="grid grid-cols-2 gap-4 p-4">
        <div className="space-y-2">
          <p><b>[tag]</b> <span className="text-muted-foreground">search within a tag</span></p>
          <p><b>user:1234</b> <span className="text-muted-foreground">search by author</span></p>
          <p><b>"words here"</b> <span className="text-muted-foreground">exact phrase</span></p>
          <p><b>collective:"Name"</b> <span className="text-muted-foreground">collective content</span></p>
        </div>

        <div className="space-y-2">
          <p><b>answers:0</b> <span className="text-muted-foreground">unanswered questions</span></p>
          <p><b>score:3</b> <span className="text-muted-foreground">posts with 3+ score</span></p>
          <p><b>is:question</b> <span className="text-muted-foreground">type of post</span></p>
          <p><b>isaccepted:yes</b> <span className="text-muted-foreground">accepted answers</span></p>
        </div>
      </div>

      <div className="flex justify-between items-center border-t px-4 py-2 bg-muted/30">
        <Button size="sm" className="rounded-sm" >   <Link to="/askquestion" className="hover:text-blue-600">
            Ask Questions
          </Link> </Button>
        
      </div>
    </div>
  )}
</div>

      </div>

      {/* Navigation */}
      <ul className="flex gap-7 items-center text-lg font-semibold">
        <li>
          <Link to="/askquestion" className="hover:text-blue-600">
            Ask Questions
          </Link>
        </li>

        <li>
          <Link to="/browsequestions" className="hover:text-blue-600">
            Browse Questions
          </Link>
        </li>

        <li>
          <Link to="/Chatwithai" className="hover:text-blue-600">
            Chat with AI
          </Link>
        </li>

        <li>
          <Link to="/about" className="hover:text-blue-600">
            About
          </Link>
        </li>

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
              <Link to="/Userprofile">
                Profile
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={logoutHandler}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <li>
            <Link to="/login" className="hover:text-blue-600">
              Login
            </Link>
          </li>
        )}
      </ul>

    </div>
  </nav>
);
}

export default Navbar