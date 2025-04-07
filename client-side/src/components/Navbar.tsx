import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logout());
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-black text-white">
      <h1 className="text-xl font-bold">Task Manager</h1>
      <button
        onClick={handleLogout}
        className="!bg-white text-black border-red-100 border px-4 py-2 rounded"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
