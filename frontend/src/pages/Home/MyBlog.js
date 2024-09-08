import React, { useEffect, useState } from "react";
import axios from "axios";

import MyblogCard from "../Myblog/Card";

const token = localStorage.getItem("authToken");

const MyBlog = () => {
  const [myBlogs, setmyBlogs] = useState();


  useEffect(() => {
    const getmyBlogs = async () => {
      try {
        if (token) {
          const config = {
            headers: {
              authorization: `Bearer ${token}`, //throws a token
            },
          };
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/blog/myblog`, config);
          const { data } = await response.data

          setmyBlogs(data);
        }
      } catch (error) {
        console.error("Error during logout:", error);
      }
    };
    getmyBlogs();
  }, []);

  return <div className="container mx-auto ">
    <div className="text-blue font-bold text-4xl my-10">My Blogs</div>

    <MyblogCard
      myBlogs={myBlogs}

    />

  </div>
};

export default MyBlog;
