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
      <nav
        className="bg-sky relative"
        style={{ boxShadow: "14px 6px 54px -8px #019B93", zIndex: "50" }}
      >
        <div className="px-4 md:px-3 sm:px-3 lg:px-32">
          <div className="flex justify-between items-center py-5">
            <div className="logo flex">
              <NavLink to="/">
                <p
                  className="
                  text-text
                  font-logo
                  text-4xl
                  flex
                  justify-center
                  items-center
                  font-extrabold
                  "
                >
                  The BLOG
                </p>
              </NavLink>
            </div>
            <div className="content md:block">
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
                  <>
                    <NavLink
                      to="/blog/create"
                      onClick={() => handleItemClick("Blog")}
                      className={`nav-link ${
                        activeItem === "Blog" ? "active" : ""
                      }`}
                    >
                      Create New
                    </NavLink>

                    <NavLink
                      to="/myblog"
                      className={`nav-link ${
                        activeItem === "myBlog" ? "active" : ""
                      }`}
                    >
                      My Blog
                    </NavLink>
                  </>
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
