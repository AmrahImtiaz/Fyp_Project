import { BookA, BookOpen, LogOut, User } from 'lucide-react'
import React from 'react'
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

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
import axios from 'axios'
import { toast } from 'sonner'

const Navbar = () => {
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
        <nav className='p-2 border-b border-gray-200 bg-transparent'>
            <div className='max-w-7xl mx-auto flex justify-between items-center'>
                {/* logo section  */}
                <div className='flex gap-2 items-center'>
                    <BookOpen className='h-6 w-6 text-blue-800' />
                    <h1 className='font-bold text-xl'><span className='text-blue-600'>Learn </span> stack </h1>
                </div>
                <form className="relative w-72">
  <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

  <Input
    name="search"
    placeholder="Search..."
    className="pl-8 pr-12"
  />

  <kbd className="absolute right-2 top-1/2 -translate-y-1/2 text-xs border rounded px-1 text-muted-foreground">
    ⌘K
  </kbd>
</form>
                <div className='flex gap-7 items-center'>
                    <ul className='flex gap-7 items-center text-lg font-semibold'>
  <Link to="/askquestion">
    <li className="cursor-pointer hover:text-blue-600">Ask Questions</li>
  </Link>

  <Link to="/browsequestions">
    <li className="cursor-pointer hover:text-blue-600">Browse Questions</li>
  </Link>

  <Link to="/about">
    <li className="cursor-pointer hover:text-blue-600">About</li>
  </Link>

  {user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user?.avatar} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <BookA className="mr-2 h-4 w-4" />
          Notes
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logoutHandler}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Link to="/login">
      <li className="cursor-pointer hover:text-blue-600">Login</li>
    </Link>
  )}
</ul>

                </div>
            </div>
        </nav>
    )
}

export default Navbar
