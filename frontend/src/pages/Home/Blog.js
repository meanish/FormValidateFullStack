import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { convertTimestamp } from "../../helper/Timeformat";
import Logo from "../../images/bg.png"

const Blog = () => {
  const { id } = useParams();
  const [blogContent, setBlogContent] = useState(null);

  useEffect(() => {
    const getSingleBlog = async () => {
      if (id) {
        try {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/blog/single/${id}`, {
            method: "GET",
          });

          const { data } = await response.json();
          setBlogContent(data);
        } catch (error) {
          console.error("Error fetching blog details:", error);
        }
      }
    };
    getSingleBlog();
  }, [id]);

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-12">
          {blogContent && (
            <div className="bg-white border min-h-screen border-gray-300 shadow-md rounded-lg p-6">
              <header className="mb-16">
                <h1 className="text-4xl font-bold  font-serif text-center text-red-600 mb-2">{blogContent.title}</h1>
                <p className="text-gray-600 text-sm">
                  <span>By {blogContent.users[0].email}</span> | <span>{convertTimestamp(blogContent.createdAt)}</span>
                </p>
              </header>

              {/* Image Position */}
              <div className="flex justify-center">
                <figure className="mb-6">
                  <img
                    className="max-w-sm w-full h-auto object-cover rounded-lg"
                    src={blogContent.featured_image || Logo}
                    alt={blogContent.title}
                  />
                </figure>
              </div>

              {/* Article Content */}
              <article
                className="prose lg:prose-xl mt-16"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(blogContent.content),
                }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;
