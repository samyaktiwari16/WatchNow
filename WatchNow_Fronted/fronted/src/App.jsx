import './App.css'
import Home from "./pages/Home"
import Login from "./pages/Login"
import Logout from "./pages/Logout"
import SignUp from "./pages/SignUp"
import ProtectedRoute from "./pages/ProtectedPage"
import './index.css'
import {Routes, Route } from "react-router-dom"; 
import Watchlist from "./pages/Watchlist";
import Favourite from "./pages/Favourite";
import Profile from "./pages/Profile";



function App(){
  localStorage.removeItem("token");
  return(
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Logout" element={<Logout />} />
        <Route path="/SignUp" element={<SignUp />} />
        
        <Route
        path="/watchlist" 
        element={
          <ProtectedRoute>
            <Watchlist />
          </ProtectedRoute>
        } 
        />

        <Route 
          path="/favourite" 
          element={
            <ProtectedRoute>
              <Favourite />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
          />

        
      </Routes>
        
    </>
  ); 
}
export default App;

