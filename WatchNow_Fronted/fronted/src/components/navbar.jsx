import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SearchBox from "./searchbox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import '../style/navbar.css/'

function Navbar({ genre, setGenre, search, setSearch  }) {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const onProtected = (e) => {
    if (!token) {
      e.preventDefault();
      navigate("/login");
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-20 shadow-lg">
      <div className="bg-black text-white flex justify-between items-center px-6 py-3 hover:bg-gray-800 transition-colors duration-300">
        
        <div className="flex items-center gap-10">
          <span className="typing text-2xl">🫣 WatchNow</span>
          <div className="hidden lg:flex gap-8 text-md font-semibold mt-2">
            <Link to="/" className="active:scale-[1.5] active:duration-[100] hover:text-gray-800 transition pt-1.5">Home</Link>
            <Link to="/watchlist" onClick={(e) => onProtected(e, "/watchlist")} className="hover:text-indigo-400 transition pt-1.5">Watchlist</Link>
            <Link to="/favourite" onClick={(e) => onProtected(e, "/favourite")} className="hover:text-indigo-400 transition pt-1.5">Favourite</Link>

            <div className="flex items-center gap-1">
              <label htmlFor="genre-select" className="flex items-center gap-2 text-gray-400 font-medium">
                Genre
              </label>

              <div className="relative">
                <select
                  id="genre-select"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="appearance-none bg-gray-700 text-gray-100 text-sm rounded-lg py-2 pl-3 pr-10 min-w-[150px] shadow border border-gray-600
                             focus:outline-none focus:ring-2 focus:ring-indigo-500 transition opacity-80">

                  <option value="" className="">All</option>
                  <option value="Action">Action</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Animation">Animated</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Romantic">Romantic</option>
                  <option value="Thriller">Thriller</option>
                  <option value="Sci-Fi">Sci-Fi</option>
                  <option value="Biography">Biography</option>
                  <option value="Mystery">Mystery</option>
                  <option value="Classic">Classic</option>
                  <option value="Drama">Drama</option>
                  <option value="Superhero">Superhero</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="h-4 w-4 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

 
        <div className="hidden md:flex flex-grow max-w-lg mx-6">
          <SearchBox search={search} setSearch={setSearch} />
        </div>

        <div className="flex items-center gap-4">
          {!token && (
            <>
              <Link to="/login">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition">Login</button>
              </Link>
              <Link to="/signup">
                <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition">Signup</button>
              </Link>
            </>
          )}
          {token && (
            <Link to="/profile">
              <AccountCircleIcon fontSize="large" sx={{ color: "white" }} />
            </Link>
          )}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-2xl">☰</button>
        </div>
      </div>

  
      {isOpen && (
        <div className="bg-black px-6 py-4 lg:hidden text-white space-y-2 border-t border-gray-700">
          <Link to="/" className="block hover:text-indigo-400">Home</Link>
          <Link to="/watchlist" onClick={(e) => onProtected(e, "/watchlist")} className="block hover:text-indigo-400">Watchlist</Link>
          <Link to="/favourite" onClick={(e) => onProtected(e, "/favourite")} className="block hover:text-indigo-400">Favourite</Link>
            <div className="flex items-center gap-2">
              <label htmlFor="genre-select" className="flex items-center gap-2 text-gray-200 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM3 16a1 1 0 011-1h12a1 1 0 011 1v0a1 1 0 01-1 1H4a1 1 0 01-1-1v0z" />
                </svg>
                Genre
              </label>

              <div className="relative">
                <select
                  id="genre-select"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="appearance-none bg-gray-700 text-gray-100 text-sm rounded-lg py-2 pl-3 pr-10 min-w-[150px] shadow border border-gray-600
                             focus:outline-none focus:ring-2 focus:ring-indigo-500 transition">

                  <option value="">All</option>
                  <option value="Action">Action</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Romantic">Romantic</option>
                  <option value="Thriller">Thriller</option>
                  <option value="Sci-Fi">Sci-Fi</option>
                  <option value="Biography">Biography</option>
                  <option value="Mystery">Mystery</option>
                  <option value="Classic">Classic</option>
                  <option value="Drama">Drama</option>
                  <option value="Superhero">Superhero</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="h-4 w-4 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          
          <div className="mt-4">
            <SearchBox search={search} setSearch={setSearch} />
          </div>
        </div>
      )}
      
    </nav>
  );
}

export default Navbar;