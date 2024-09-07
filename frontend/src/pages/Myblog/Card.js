import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { extractFirstHeading, extractFirstParagraph } from "../../helper/Utils/ParagraphExtract";

const MyblogCard = ({ myBlogs: blogs }) => {
  const token = localStorage.getItem("authToken");

  const [myBlogs, setMyBlogs] = useState(blogs);

  useEffect(() => {
    if (blogs) {
      setMyBlogs(blogs)

    }
  }, [blogs])


  // Delete handler to remove blog
  const deleteHandler = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this blog?");
    if (!isConfirmed) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/blog/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Update the state by removing the deleted blog
        setMyBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
        const responseData = await response.json();
        alert(responseData.message);
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("An error occurred while deleting the blog.");
    }
  };

  if (!myBlogs || myBlogs.length === 0) {
    return <p className="text-center text-gray-600 text-3xl">No blogs available.</p>;
  }

  return (
    <div className="relative bg-white rounded-lg shadow-md my-6 mx-auto overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-300">
            <th className="p-4 text-left">Image</th>
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Description</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {myBlogs?.map((val) => {
            const Paragraph = extractFirstParagraph(val);
            const Heading = extractFirstHeading(val);
            const { title, featured_image } = val;

            return (
              <tr key={val._id} className="">
                <td className="p-4 w-1/4">
                  <img
                    className="object-cover w-32 h-32 rounded-lg transition-transform duration-500 hover:scale-110"
                    src={featured_image}
                    alt="blog_image"
                  />
                </td>

                <td className="p-4 w-1/4">
                  <h5 className="text-lg font-semibold text-gray-800 mb-2 truncate">{title || "NULL"}</h5>
                </td>

                <td className="p-4 w-1/2">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{Paragraph || "NULL"}</p>
                </td>

                <td className="p-4 w-1/4">
                  <div className="flex gap-2 justify-center">
                    <NavLink
                      to={`/blog/update/${val._id}`}
                      className="bg-yellow-500 text-blue-400 py-2 px-4 rounded-md shadow-md hover:bg-yellow-600 transition-colors duration-200"
                    >
                      Edit
                    </NavLink>
                    <button
                      onClick={() => deleteHandler(val._id)}
                      className="bg-red-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-600 transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MyblogCard;
