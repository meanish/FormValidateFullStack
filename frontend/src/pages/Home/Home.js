import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/ckeditorstyles.css";
import BlogContentExtractor from "../Blog/ExtractBlogs";

const Home = () => {
  const [allBlogs, setallBlogs] = useState([]);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const getBlogs = async () => {
      try {

        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER}/blog/view`
        );
        setallBlogs(response.data.blogs);
      } catch (error) {
        console.log("Error in home to get blogs", error);
      }
    };
    getBlogs();
  }, [token]);

  return (
    <div className=" home_main ">
      <div className="container mx-auto min-h-screen px-8 py-12">

        <h1 className=" text-blue font-bold text-4xl mb-10">
          Latest Articles:
        </h1>
        <div className="allBlogs grid gap-10 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {allBlogs &&
            allBlogs.map((val) => (
              <BlogContentExtractor key={val._id} val={val} />
            ))}
        </div>
      </div>

    </div>
  );
};

export default Home;
