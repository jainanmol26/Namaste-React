import { useState } from "react";
import { logo_url } from "../utils/constants";
import { Link } from "react-router";
const Header = () => {
  const [btnName, setbtnName] = useState("Login");
  return(
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={logo_url}></img>
      </div>
      <div className="nav-items">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>Cart</li>
          <button className="login" onClick={() => {btnName == "Login"?setbtnName("Logout"):setbtnName("Login");
            console.log(btnName);
          }}>{btnName}</button>
        </ul>

      </div>
    </div>
    
  )
}

export default Header;