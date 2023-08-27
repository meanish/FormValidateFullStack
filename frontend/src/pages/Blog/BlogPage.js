import React from "react";

const BlogPage = ({ allBlogs, loading }) => {
  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        allBlogs.map((blog, index) => (
          <div key={index}>
            <h1>{blog.title}</h1>
            <p>{blog.content}</p>
          </div>
        ))
      )}
    </>
  );
};

export default BlogPage;
