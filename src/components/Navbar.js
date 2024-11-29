import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
      <nav className="bg-blue-600 text-white">
        <div className="container flex justify-between p-4 mx-auto">
            <img src='../../logo.png' className="w-[30px] h-[30px]" alt="image not found"/>
          <ul className="flex space-x-4">
            
            <li>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
            </li>
            <li>
              <Link to="/quote" className="hover:underline">
                Quote
              </Link>
            </li>
            <li>
              <Link to="/quote" className="hover:underline">
                Create Quote
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
}

export default Navbar;