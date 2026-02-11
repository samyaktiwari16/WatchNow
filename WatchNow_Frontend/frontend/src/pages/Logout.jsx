import axios from "axios";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const logout = async () => {

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "https://watchnow-316b.onrender.com/logout/", {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log("Logout error", error.response?.data || error.message);
    } finally {
      localStorage.clear();
      delete axios.defaults.headers.common["Authorization"];
      alert("Logout successful");
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col">
      <button className="bg-violet-500" onClick={logout}>Logout</button>
    </div>
  );
}

export default Logout;
