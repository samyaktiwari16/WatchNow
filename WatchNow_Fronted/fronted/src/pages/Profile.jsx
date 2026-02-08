import { useEffect,useState } from "react";
import axios from "axios";
import Logout from "./Logout";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

function Profile () {
    const [username, setUsername] = useState(null);

    useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("https://watchnow-bjw4.onrender.com/profile/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
    });

    setUsername(res.data);
    } catch (error) {
      console.log("Profile error:", error);
    }
  };
  
  fetchProfile();
  }, []);
  
      return (
       <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <h1 className="text-center invisible">  This heading is used for fixing Profile Page so keep everything perfect. </h1>
          <Navbar />
            <div className="min-h-screen w-full flex items-center justify-center ">
              <div className="w-full max-w-lg bg-gray-900 bg-opacity-80 border border-gray-700 rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl transform transition-transform duration-300 hover:scale-105">
                <div className="hidden md:block absolute -top-8 -left-8 w-24 h-24 bg-pink-500 rounded-full opacity-20 animate-pulse pointer-events-none"></div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-pink-500 to-pink-400 flex items-center justify-center text-white font-bold text-xl sm:text-2xl">
                      {/* Replace with <img /> for a real avatar */}
                      JS
                    </div>
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-tight">
                      Welcome Back {username?.username}
                    </h1>
                    <h3 className="mt-1 text-sm sm:text-md text-pink-300 font-medium">
                      This is your Profile Page.
                    </h3>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:flex sm:items-center sm:justify-between gap-3">
                  <Logout />
               

                  <button
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-pink-400 border border-gray-700 py-3 px-6 rounded-xl transition"
                    onClick={() => {/* Example secondary action */}}>
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
            
          <Footer />
        </div>
      )
  }

export default Profile;