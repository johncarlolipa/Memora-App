import { Link } from "react-router-dom";
import logo from "../assets/react.svg"

function Navbar() {
  return <div><Link><img src={logo} /></Link></div>;
}

export default Navbar;
