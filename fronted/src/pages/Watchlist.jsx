import Navbar from "../components/navbar"
import Footer from "../components/footer"
import { useState, useEffect } from "react";
import axios from "axios";  
import img from "../assets/images/cinema.jpg";
import BarLine from "../components/Bar";


function Watchlist () {
  const [watchlistmovies, setWatchlistMovies] = useState([]);
  const token = localStorage.getItem("token");
  
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/watchlist/", {
      headers: {
        Authorization: `Bearer ${token}`
      }
      
    })
    
      .then(res => setWatchlistMovies(res.data));
  }, []);


  const removeFromWatchlist = async (movieID) => {
    const token = localStorage.getItem("token");
      await axios.delete(
        `http://127.0.0.1:8000/remove/watchlist/${movieID}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Movie is Removed from watchlist");
      setWatchlistMovies(prev =>
        prev.filter((item) => item.id !== movieID)
    );
  };
  

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">

      <Navbar />

      <h1 className="text-center text-pink-400 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-orange-600 to-red-700 animate__animated  animate__fadeInDown animate__slow 30 -mb-15 mt-20 ml-2 mr-2">  Welcome to Watchlist,   Here you find your watchlist movies </h1>
      <h2 className="text-center text-white font Lucida Handwriting font-extrabold animate__animated  animate__fadeInDown animate__fast -mb-15 mt-20 ml-2 mr-2"> Enjoy Day and Night </h2>
        <div className="md:w-full lg:w-full h-100 mt-20 flex justify-between items-center">
          <img
          src={img}
          alt="below-navbar-visual"
          className="w-full h-full object-cover"
          />
        </div>
      <BarLine />

      <div className="w-full flex gap-3 flex-wrap justify-center px-3">
        {watchlistmovies.length === 0 ? (
        <div className="text-center mt-16 text-gray-300">
          <h2 className="text-4xl font-semibold">
            Your watchlist is empty 🎬
          </h2>
          <p className="mt-2 text-md text-gray-600">
            Add movies to watch later
          </p>
        </div>
      ) :
        (watchlistmovies.map(item => (
          <div key={item.movie.id}>
            
            <div className="w-80 h-full overflow-hidden bg-black rounded-lg border border-black hover:scale-[1.02] ">
              
              <img
                src={item.movie.image_link}
                className="w-full h-72 object-cover rounded-t-lg"/>

              <div className="flex flex-col text-center mt-2 px-2">
                <h1 className="text-heading font-semibold tracking-tight">
                  {item.movie.title}
                </h1>

                <h3 className="text-white font-semibold mt-2">
                  {item.movie.rating}/10 ⭐ IMDB
                </h3>
              </div>

              <div className="flex justify-between text-sm px-3 mt-2 mb-1">
                <span>Duration: {item.movie.duration} min</span>
                <span>Director: {item.movie.director}</span>
              </div>

              <div className="text-xs text-center mb-3">
                Added on {item.added_at}
              </div>
            
              <div className="flex flex-col gap-y-4 m-3">
                <button type="button"
                  onClick={() => removeFromWatchlist(item.id)}
                  className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl hover:scale-[0.9] focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5">
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))
        )}
      </div>

      <Footer />
    </div>
  );
};
export default Watchlist;