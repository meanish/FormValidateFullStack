import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Logo from "../images/nobg.png";


const Navbar = () => {
  const [activeItem, setActiveItem] = useState("");
  const [tokenAvailable, setTokenAvailable] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [token, setToken] = useState();

  useEffect(() => {
    let isToken = localStorage.getItem("authToken")
    if (isToken) {
      setToken(isToken)
      setTokenAvailable(!!isToken);
    }
  }, [token, navigate]);


  const handleItemClick = (item) => {
    setActiveItem(item);
    setMenuOpen(false);
  };

  const removeHandler = async (token) => {

    try {
      if (tokenAvailable) {
        const config = {
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
        await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/logout`, config);
        localStorage.removeItem("authToken");
        navigate("/");
        window.location.reload();

      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };


  // Toggle profile dropdown
  const toggleProfileDropdown = () => {
    setProfileOpen(!profileOpen);
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="sticky top-0 z-50">
      <nav className="nav_main">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <NavLink to="/" className="text-3xl font-bold  text-white tracking-wider" style={{ fontFamily: "'Dancing Script', cursive" }}>
              The BLOGS
            </NavLink>

            {/* Hamburger Menu Icon for mobile */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-white focus:outline-none">
                {menuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>

            {/* Navigation Links for larger screens */}
            <div className={`md:flex items-center space-x-8 ${menuOpen ? 'flex flex-col bg-purple-400 w-full left-0 top-16 gap-4 py-4 absolute items-center mt-4' : 'hidden'}`}>
              {!tokenAvailable ? (
                <>
                  <NavLink
                    to="/login"
                    onClick={() => handleItemClick("Login")}
                    className={`relative nav_link px-4 py-2 text-lg font-semibold hover:text-gray-200 transition-all ${activeItem === "Login" ? "nav-active" : ""}`}
                  >
                    Login
                    {activeItem === "Login" && <span className="nav-underline"></span>}
                  </NavLink>

                  <NavLink
                    to="/register"
                    onClick={() => handleItemClick("Register")}
                    className={`relative nav_link px-4 py-2 text-lg font-semibold hover:text-gray-200 transition-all ${activeItem === "Register" ? "nav-active" : ""}`}
                  >
                    Register
                    {activeItem === "Register" && <span className="nav-underline"></span>}
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to="/"
                    onClick={() => handleItemClick("Home")}
                    className={`relative nav_link px-4 py-2 text-lg font-semibold hover:text-gray-200 transition-all ${activeItem === "Home" ? "nav-active" : ""}`}
                  >
                    Home
                    {activeItem === "Home" && <span className="nav-underline"></span>}
                  </NavLink>
                  <NavLink
                    to="/blog/create"
                    onClick={() => handleItemClick("Create")}
                    className={`relative nav_link px-4 py-2 text-lg font-semibold hover:text-gray-200 transition-all ${activeItem === "Create" ? "nav-active" : ""}`}
                  >
                    Create New
                    {activeItem === "Create" && <span className="nav-underline"></span>}
                  </NavLink>

                  <NavLink
                    to="/myblog"
                    onClick={() => handleItemClick("MyBlog")}
                    className={`relative nav_link px-4 py-2 text-lg font-semibold hover:text-gray-200 transition-all ${activeItem === "MyBlog" ? "nav-active" : ""}`}
                  >
                    My Blog
                    {activeItem === "MyBlog" && <span className="nav-underline"></span>}
                  </NavLink>

                  <div className="relative">
                    <button
                      onClick={toggleProfileDropdown}
                      className="focus:outline-none"
                    >
                      <div className="w-10 h-10 rounded-full bg-green-300 text-black flex items-center justify-center text-lg">
                        P
                      </div>
                    </button>
                    {profileOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                        <button
                          onClick={() => removeHandler(token)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black"
                        >
                          Logout
                        </button>

                        {/* <button
                          onClick={() => {
                            const confirmed = window.confirm("Are you sure you want to remove your account? This action cannot be undone.");
                            if (confirmed) {
                              removeAccHandler();
                            }
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:text-red-800 hover:bg-red-100"
                        >
                          Remove Account
                        </button> */}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
