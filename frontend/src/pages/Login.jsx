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
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getData } from '@/context/userContext'
import Google from "../assets/googleLogo.png"
import { Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react";

export const Login = () => {
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
  <>
    <style>
{`
.login-page {
  background-color: #F1F3F6;
}

.login-form {
  background-color: #fff;
  box-shadow: 0px 12px 50px rgba(0, 0, 0, 0.1);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.logo {
  padding: 30px 0;
}

.page-heading {
  text-align: center;
  padding: 10px 0;
}

.page-heading h2 {
  font-size: 20px;
  font-weight: 700;
}

.items {
  margin-top: 20px;
  margin-bottom: 5px;
}

.items label {
  font-size: 16px;
  color: #555555;
  margin-bottom: 8px;
}

.items .input {
  background-color: #f1f3f6;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
}

.items .input i {
  width: 50px;
  height: 50px;
  background-color: #FD7401;
  color: #fff;
  display: grid;
  place-content: center;
  font-size: 24px;
}

.items .input input {
  background-color: transparent;
  border: 0;
  padding: 10px;
  width: calc(100% - 50px);
}

.forgot-password {
  text-align: right;
}

.forgot-password a {
  color: #1E2772;
  font-size: 14px;
}

.form-signin {
  text-align: center;
  margin: 15px 0;
}

.form-signin .btn {
  background-color: #FD7401;
  width: 100%;
  color: #fff;
  font-size: 16px;
  padding: 10px;
  box-shadow: 0px 8px 12px rgba(253, 116, 1, 0.3);
}

.or-option {
  text-align: center;
  position: relative;
  margin-bottom: 20px;
}

.or-option:before {
  width: 100%;
  height: 1px;
  background-color: #C2C2C2;
  position: absolute;
  top: 15px;
  left: 0;
  content: "";
  z-index: 1;
}

.or-option:after {
  width: 40px;
  height: 30px;
  background-color: #fff;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%);
  content: "";
  z-index: 2;
}

.or-option p {
  padding: 5px;
  text-transform: uppercase;
  color: #C2C2C2;
  font-size: 14px;
  margin-bottom: 0;
  z-index: 3;
  position: relative;
  display: block;
  width: 100%;
}

.form-signup {
  text-align: center;
}

.form-signup .btn {
  background-color: #fff;
  width: 100%;
  color: #FD7401;
  font-size: 16px;
  padding: 10px;
  border: 1px solid #FD7401;
}

.login-extra {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
`}
</style>
<div className="min-h-screen bg-white">
      <div className="flex w-full">

        {/* Left Section */}
        <div className="w-full max-w-md p-10 space-y-8">

          {/* Logo */}
          <div className="flex justify-center">
            <img
              src="https://i.pinimg.com/1200x/0b/16/9f/0b169fc654cfa442ff6d2dafb6e2c243.jpg"
              className="w-28"
            />
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-semibold text-center text-gray-900">
            Login into your account
          </h2>

          <Card className="shadow-none border-none">
            <CardContent className="space-y-6">

              {/* Email */}
              <div className="space-y-1">
                <Label>Email Address</Label>
                <div className="relative">
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10"
                  />
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <Label>Password</Label>
                <div className="relative">
                  <Input
                    name="password"
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10"
                  />
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-500" />

                  <button
                    type="button"
                    className="absolute right-3 top-2.5"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-600" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-600" />
                    )}
                  </button>
                </div>

                <div className="text-right text-sm">
                  <Link to="/forgot-password" className="text-blue-600">
                    Forgot Password?
                  </Link>
                </div>
              </div>

              {/* Login Button */}
              <Button
                className="w-full py-5 text-white bg-blue-600 hover:bg-blue-500"
                onClick={handleSubmit}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Logging into your account...
                  </>
                ) : (
                  "Login Now"
                )}
              </Button>

              {/* OR Divider */}
              <div className="text-center my-2 text-gray-400">OR</div>

              {/* Google */}
              <Button
                variant="outline"
                onClick={() =>
                  window.open("http://localhost:8000/auth/google", "_self")
                }
                className="w-full py-5 flex gap-2"
              >
                <img src={Google} className="w-5" />
                Login with Google
              </Button>

              {/* Signup Button */}
              <Link to="/signup">
                <Button className="w-full py-5 bg-black text-white hover:bg-gray-800">
                  Signup Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Right Section – Image */}
        <div className="hidden lg:flex flex-1">
          <img
            src="https://svgshare.com/i/nDi.svg"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
</>
  );
}
