import { useState } from 'react';
import { Lock, UserCircle } from 'lucide-react';
import img2 from "../assets/images/media.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import Navbar from "../components/navbar";
import Footer from "../components/footer";


function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post("http://127.0.0.1:8000/login/", {
        username,
        password,
      })
      localStorage.setItem("token", data.access)
      localStorage.setItem("refresh", data.refresh)
      navigate("/")
    } catch {
      alert("Invalid username or password")
    }
  }

  return (
    <div className="">
        <Navbar />
        <div className="min-h-screen flex flex-col md:flex-row">
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white p-6">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
            <h2 className="text-3xl font-extrabold text-gray-800 text-center">
                Sign In
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                </label>
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <UserCircle size={20} />
                    </span>
                    <input
                    id="username"
                    type="text"
                    required
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 text-black"/>
                </div>
                </div>

                <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                </label>
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <Lock size={20} />
                    </span>
                    <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 text-black"/>
                </div>
                </div>

                <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-sm transition">
                Login
                </button>

                <div className="text-sm text-center">
                <a href="/forgot-password" className="text-indigo-600 hover:underline">
                    Forgot your password?
                </a>
                </div>
            </form>
            </div>
        </div>

        <div className="hidden md:block md:flex-1">
            <img src ={ img2} className="w-full h-full object-cover rounded-tr-2xl rounded-br-2xl" />
        </div>
        </div>
        <Footer />
    </div>
  )
}

export default Login