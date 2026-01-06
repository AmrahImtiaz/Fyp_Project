import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getData } from '@/context/userContext'
import Google from "../assets/googleLogo.png"

const Login = () => {
    const {setUser} = getData()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(formData);
        try {
            setIsLoading(true)
            const res = await axios.post(`http://localhost:8000/user/login`, formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (res.data.success) {
                navigate('/')
                setUser(res.data.user)
                localStorage.setItem("accessToken", res.data.accessToken)
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log('Login error', error)
            const resp = error?.response?.data
            let msg = error.message
            if (resp) {
                if (resp.message) msg = resp.message
                else if (Array.isArray(resp.errors)) msg = resp.errors.join(', ')
                else if (typeof resp === 'string') msg = resp
            }
            toast.error(msg)
            // If account not verified, optionally navigate to verify page
            if (error?.response?.status === 403) {
                // keep user on login but suggest verification
                // navigate('/verify') // uncomment to redirect automatically
            }

        } finally {
            setIsLoading(false)
        }

    }
    return (
        
        <div
  className="bg-cover bg-center h-full w-full"
  style={{
    backgroundImage:
      "url('https://i.pinimg.com/1200x/83/6f/7c/836f7cfc772af123841c59e3bf7835a6.jpg')",
  }}
>

            <div className='min-h-screen flex to-muted/20'>
                <div className='flex-1 flex p-4'>
                    <div className='w-full max-w-md space-y-6 flex flex-col items-center'>
                        
                        <Card className="w-full max-w-sm h-full bg-white align-left ">
                            <div className="flex-row">
                            <div className="justify-center items-center flex-col">
                            <CardHeader className='space-y-1'>
                                <CardTitle className='text-2xl text-center text-blue-600 '>Login</CardTitle>
                                <CardDescription className='text-left'>
                                        Login into your account to get started with LearnStack
                                    </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="m@example.com"
                                            required
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <div className='flex items-center justify-between'>
                                            <Label htmlFor="password">Password</Label>
                                            <Link className='text-sm' to={'/forgot-password'}>Forgot your password?</Link>
                                        </div>
                                        <div className='relative'>
                                            <Input
                                                id="password"
                                                name="password"
                                                placeholder="Enter your password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                type={showPassword ? "text" : "password"}
                                                required
                                            />
                                            <Button
                                                variant='ghost'
                                                size="sm"
                                                className='rounded-sm absolute right-0 top-0 h-full px-6 py-4 hover:bg-transparent'
                                                onClick={() => setShowPassword(!showPassword)}
                                                disabled={isLoading}
                                            >
                                                {
                                                    showPassword ? <EyeOff className="w-4 h-4 text-gray-600 rounded-sm" /> : <Eye className="w-4 h-4 text-gray-600" />
                                                }

                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex-col gap-2">
                                <Button onClick={handleSubmit} type="submit" className="w-full rounded-sm bg-blue-600 hover:bg-blue-500 text-white">
                                    {
                                        isLoading ? (
                                            <>
                                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                                Logging into your account..
                                            </>
                                        ) : "Login"
                                    }
                                </Button>
                                <Button onClick={()=>window.open("http://localhost:8000/auth/google", "_self")} className='rounded-sm w-full text-black' variant='outline'>
                                    <img src={Google} alt="" className='w-5'/>
                                    Login with Google
                                    </Button>
                                <div className="text-sm text-center mt-2">
                                    Don't have an account? <Link to="/signup" className="text-blue-600 font-medium text-white ">Sign up</Link>
                                </div>
                            </CardFooter>
                            <img src="https://i.pinimg.com/originals/48/a1/91/48a191cf436936466f66599a6aa0eda9.gif" alt="" />
                            </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
