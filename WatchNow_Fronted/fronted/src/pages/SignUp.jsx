import { useState } from 'react'
import { Lock, UserCircle, Mail } from 'lucide-react'
import axios from "axios"
import { useNavigate } from "react-router-dom"
import img from "../assets/images/caught-in-joy.jpg"
import Navbar from "../components/navbar"
import Footer from "../components/footer"

function Signup() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post("https://watchnow-316b.onrender.com/register/", {
        username,
        email,
        password,
      })

      alert("Signup successful! Please login.")
      navigate("/login")
    } catch {
      alert("Failed to register. Userame or email already exists.")
    }
  }

  return (
    <div className="">

        <Navbar />
            
            <div className="min-h-screen flex flex-col md:flex-row">
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white p-6">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
                <h2 className="text-3xl font-extrabold text-gray-800 text-center">
                    Create Account
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
                            placeholder="Choose a username"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 text-black"/>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                            <Mail size={20} />
                            </span>
                            <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="your.email@example.com"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 text-black"
                            />
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
                            placeholder="Create a password"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 text-black"/>
                        </div>
                    </div>

                    <button type="submit"
                        className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-sm transition">
                        Sign Up
                    </button>
                </form>
                </div>
            </div>


            <div className="hidden md:block md:flex-1">
                <img
                src={img}
                alt="Signup visual"
                className="w-full h-full object-cover rounded-tr-2xl rounded-br-2xl"
                />
            </div>
            </div>
        <Footer />
    </div>
  )
}

export default Signup