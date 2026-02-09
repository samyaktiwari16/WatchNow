import IconButton from "@mui/material/IconButton";  
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MovieCard({ movie }) {
  const navigate = useNavigate();

  const handleFavourite = async() => {
    const token = localStorage.getItem("token");
    if(!token){
      navigate("/login");
    }
    try{
      await axios.post("https://watchnow-316b.onrender.com/add/favourite/", { movie_id: movie.id}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("Added to favourite");
    } 
    catch (error) {
      console.log("Error adding to favourites:", error);
    }};

  const handleWatchlist = async() => {
    const token = localStorage.getItem("token");
    if(!token){
      navigate("/login");
    }
    try{
      await axios.post("https://watchnow-316b.onrender.com/add/watchlist/", { movie_id: movie.id}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("Added to Watchlist");
    } 
    catch (error) {
      console.log("Error adding to watchlist:", error);
    
  }}
    
  return (
    <div className="pt-2 min-h-screen flex justify-center items-center">
      <div className="w-91 h-full overflow-auto justify-between items-center flex flex-wrap gap-0 justify-center bg-black block max-w-sm border border-radius-[20px] hover:scale-[1.009] object-cover rounded-lg border-black">

          <img
            src={movie?.image_link}
            className="rounded-t-base overflow-hidden"/>

          <div className="flex space-x-2 text-center text-base justify-center flex flex-col">
            <h3 className="text-heading font-semibold tracking-tight hover:text-orange-400 hover:scale-[1.05]">
              {movie?.title}
            </h3>
            <h6 className="text-white font-semibold mt-1">{movie?.rating}/10 ⭐ IMDB</h6>
          </div>

          <div className="flex gap-4 justify-between  text-base items-center px-2 w-full hover:text-green-400">
            <h6 className="text-right">Duration:{movie?.duration}min</h6>
            <h6 className="text-left">Director:{movie?.director}</h6>
          </div>

          <div className="relative group inline-block hover:scale-[1.15]">
            <IconButton aria-label="add to favorites"  onClick={() => handleFavourite(movie.id)}>
              <FavoriteIcon sx={{ color:"red" }}/>
            </IconButton>
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded">
              Add to favourite
              </span>
          </div>

          <div className="relative group inline-block hover:scale-[1.15]">
            <IconButton aria-label="add to watchlist" onClick={ () => handleWatchlist(movie.id)}>
              <BookmarkIcon sx={{ color:"yellow" }} />
            </IconButton>
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 hidden group-hover:block bg-black text-white text-xs px-2 rounded">
                Add to Watchlist
              </span>
          </div>
      </div>
    </div>
  );
}

export default MovieCard;