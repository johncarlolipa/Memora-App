import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import logo from "../assets/notebook.svg";

function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };
  return (
    <div className="bg-pharlap p-4 flex items-center justify-between">
      <Link to="/" className="flex items-center space-x-2">
        <img src={logo} alt="React Logo" className="h-10 w-10 ml-6" />
      </Link>
      <nav className="flex items-center">
          {user && (
            <div className="space-x-4">
              <span className="text-white font-semibold">Hi, {user.username}</span>
              <button
                onClick={handleClick}
                className="px-4 py-2 bg-yellowish hover:bg-yellow-100  font-semibold rounded-md"
              >
                Log out
              </button>
            </div>
          )}
          {!user && (
            <div className="space-x-4">
              <Link
                to="/login"
                className=" px-4 py-2 bg-yellowish hover:border border-gray-300 font-semibold rounded-md"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-yellowish hover:border border-gray-300 font-semibold rounded-md"
              >
                Signup
              </Link>
            </div>
          )}
        </nav>
    </div>
  );
}

export default Navbar;
