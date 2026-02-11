
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import MovieCard from "../components/moviecard";
import BarLine from "../components/Bar";
import img from "../assets/images/batman.jpg";
import NoResults from "./Nothing";

function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");

  useEffect(() => {
    axios
      .get("https://watchnow-316b.onrender.com")
      .then((res) => {
        // Expecting an array; fall back to empty array if unexpected
        setMovies(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  // Treat any of these as "show all"
  const isAllSelected = () => {
    if (genre === null || genre === undefined) return true;
    const g = String(genre).trim().toLowerCase();
    return g === "" || g === "all"
  };

   const filteredMovies = movies.filter((movie) => {
    if (!movie) return false;

    // Genre filter
    const genreMatch = isAllSelected()
      ? true
      : (() => {
          if (!movie.genre) return false;
          const parts = String(movie.genre)
            .split(",")
            .map((p) => p.split("/"))
            .flat()
            .map((p) => p.trim().toLowerCase())
            .filter(Boolean);
          return parts.includes(String(genre).trim().toLowerCase());
        })();

    // Search filter: match in title or description
    const sTerm = String(search || "").trim().toLowerCase();
    const searchMatch =
      sTerm === "" ||
      (String(movie.title || "").toLowerCase().includes(sTerm)) ||
      (String(movie.description || "").toLowerCase().includes(sTerm));

    return genreMatch && searchMatch;
  });

  return (
    <div className="bg-gradient-to-bl from-gray-900 to-gray-800 flex flex-col">

      <Navbar genre={genre} setGenre={setGenre} search={search} setSearch={setSearch} />
      <h1 className="text-center text-pink-400 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-orange-400 to-red-700 animate__animated  animate__fadeInDown animate__slow 30 -mb-15 mt-20 ml-2 mr-2">  Welcome to WatchNow,   Here you find your movies and happiness. </h1>
      <h4 className="text-center text-white font-extrabold animate__animated  animate__fadeInDown animate__fast -mb-15 mt-20 ml-2 mr-2" style={{ "--animate-duration": "2s" }}> Enjoy Day and Night </h4>
    
      <div className="md:w-full lg:w-full h-96 mt-20 flex justify-between items-center">
        <img
          src={img}
          alt="Audience cinema"
          className="w-full h-full object-cover rounded-tr-2xl rounded-br-2xl"
        />
      </div>


      <BarLine />
      <h1 className="text-3xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-red-700 font-sans text-center animate__animated  animate__zoomInUp animate__slow 30  mb-3 mt-5">
        Lights Off. Curtains Close. And Start,
      </h1>

      <h1 className="text-center text-green-400 drop-shadow-md font-semibold font BlinkMacSystemFont tracking-wider leading-tight animate__animated  animate__slideInLeft animate__slow 20 mb-10 ml-2 mr-2" style={{ "--animate-duration": "2s" }}> Watching Movies 😆 </h1>

      <main className="w-full flex flex-wrap gap-3 flex-grow min-h-0 ml-3 pb-4">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <MovieCard key={movie.id ?? movie._id ?? movie.title} movie={movie} />
          ))
        ) : (
            <NoResults />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Home;