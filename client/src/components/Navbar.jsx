import { Link } from "react-router-dom";
import logo from "../assets/react.svg";

function Navbar() {
  return (
    <div className="bg-pharlap p-4 flex items-center justify-between">
      <Link to="/" className="flex items-center space-x-2">
        <img src={logo} alt="React Logo" className="h-8 w-8" />
        <span className="text-white text-lg font-bold">Memora</span>
      </Link>
    </div>
  );
}

export default Navbar;
