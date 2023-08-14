import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const token = localStorage.getItem("authToken");

const Blog = () => {
  const navigate = useNavigate();

  useEffect(
    () => {
      if (!token) {
        navigate("/");
      }
    },
    [],
    [navigate]
  );

  const removeHandler = async () => {
    try {
      if (token) {
        const config = {
          headers: {
            authorization: `Bearer ${token}`, //throws a token
          },
        };
        await axios.get("/logout", config);
        localStorage.removeItem("authToken");
        navigate("/");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const removeAccHandler = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to remove your account? This action cannot be undone."
    );

    if (confirmed) {
      try {
        const config = {
          headers: {
            authorization: `Bearer ${token}`, //throws a token
          },
        };
        await axios.delete("/logout", config);
        localStorage.removeItem("authToken");
        navigate("/");
      } catch (error) {
        console.error("Error during account removal:", error);
      }
    }
  };

  return (
    <div>
      <h1>Means youre loggin in the system</h1>
      <button onClick={removeHandler}>Logout</button>
      <button onClick={removeAccHandler}>Remove Account</button>
    </div>
  );
};

export default Blog;
