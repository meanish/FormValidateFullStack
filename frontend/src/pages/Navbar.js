import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState();
  const [tokenava, setTokenava] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setTokenava(true);
    }
  }, []);

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <NavLink to="/" className="text-white text-lg font-semibold">
                Logo
              </NavLink>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink
                  to="/login"
                  onClick={() => handleItemClick("Login")}
                  className={`nav-link ${
                    activeItem === "Login" ? "active" : ""
                  }`}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={() => handleItemClick("Register")}
                  className={`nav-link ${
                    activeItem === "Register" ? "active" : ""
                  }`}
                >
                  Register
                </NavLink>
                {tokenava ? (
                  <NavLink
                    to="/blog"
                    onClick={() => handleItemClick("Blog")}
                    className={`nav-link ${
                      activeItem === "Blog" ? "active" : ""
                    }`}
                  >
                    Blog
                  </NavLink>
                ) : (
                  []
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
