import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import "../../styles/ckeditorstyles.css";
import BlogContentExtractor from "../Blog/ExtractBlogs";
import { NavLink } from "react-router-dom";

const Home = () => {
  // const dispatch = useDispatch();
  // const allBlogs = useSelector((state) => state.blog.allBlogs);
  // const loading = useSelector((state) => state.blog.loading);
  const [allBlogs, setallBlogs] = useState([]);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const getBlogs = async () => {
      try {
        if (token) {
          const config = {
            headers: {
              authorization: `Bearer ${token}`, //throws a token
            },
          };
          const response = await axios.get("/blog/view", config);
          setallBlogs(response.data.blogs);
          console.log(response.data.blogs);
        }
      } catch {}
    };
    getBlogs();
  }, []);

  return (
    <>
      <Navbar />
      <div className="blog-container bg-lightsky min-h-screen px-32">
        <h1>Blogs in dB</h1>
        <div className="allBlogs grid gap-12 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
          {allBlogs &&
            allBlogs.map((val) => (
              <BlogContentExtractor key={val._id} val={val} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;
