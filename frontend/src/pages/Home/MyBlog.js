import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import {
  extractFirstHeading,
  extractFirstImage,
  extractFirstParagraph,
} from "../../helper/Utils/ParagraphExtract";
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
          const response = await axios.get("/blog/myblog", config);
          setmyBlogs(response.data);
        }
      } catch (error) {
        console.error("Error during logout:", error);
      }
    };
    getmyBlogs();
  }, []);

  return (
    <>
      <Navbar />
      <div className="lg:px-32 bg-sky  pt-14 sm:px-4 md:px-32">
        {myBlogs &&
          myBlogs.map((val) => {
            const Paragraph = extractFirstParagraph(val);
            const Heading = extractFirstHeading(val);
            const imgSrc = extractFirstImage(val);
            return (
              <MyblogCard
                Paragraph={Paragraph}
                Heading={Heading}
                Image={imgSrc}
                val={val}
              />
            );
          })}
      </div>
    </>
  );
};

export default MyBlog;
