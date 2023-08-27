import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Navbar from "../Navbar";
import DOMPurify from "dompurify";
import { convertTimestamp } from "../../helper/Timeformat";

const token = localStorage.getItem("authToken");

const Blog = ({ val }) => {
  const { id } = useParams();
  const [blogContent, setblogContent] = useState();
  console.log(blogContent);
  useEffect(() => {
    const GetSingleBlog = async () => {
      if (id) {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const response = await fetch("/blog/singleblog", {
          method: "POST",
          headers: headers,
          body: JSON.stringify({ id: id }),
        });

        const data = await response.json();
        setblogContent(data);
      }
    };
    GetSingleBlog();
  }, []);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <div className="bg-navbar pt-5 flex-grow content px-32">
          <div className="border shadow-lg p-4 bg-text rounded-lg">
            <div className="goback">
              <button>Go Back</button>
            </div>
            {blogContent && (
              <>
                <p>{blogContent.users[0].email}</p>
                <div>{convertTimestamp(blogContent.createdAt)}</div>
                <div
                  className="ck-content"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(blogContent.content),
                  }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
