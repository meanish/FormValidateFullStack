import React from "react";
import { NavLink } from "react-router-dom";
import { convertTimestamp } from "../../helper/Timeformat";

const BlogCard = ({ Paragraph, Heading, Image, val }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-300">
        <div className="flex-shrink-0">
          <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-full w-12 h-12 flex items-center justify-center text-white text-lg font-semibold">
            {val.users[0].full_name.charAt(0)}
          </div>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {val.users[0].full_name}
          </h3>
          <p className="text-sm text-gray-500">
            {convertTimestamp(val.createdAt)}
          </p>
        </div>
      </div>

      {/* Image */}
      <div className="relative">
        <img
          src={Image}
          alt="blog"
          className="w-full h-52 object-cover"
        />
        <NavLink
          to={`blog/${val._id}`}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 text-white opacity-0 hover:opacity-100 transition-opacity duration-500 ease-in-out"
        >
          <div className="text-center">
            <span className="text-lg font-bold uppercase tracking-wider">Read More</span>
            <div className="mt-2 w-24 h-1 bg-white mx-auto"></div>
          </div>
        </NavLink>
      </div>

      {/* Content */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 truncate">
          {val.title}
        </h2>
        <p className="text-gray-700 mt-3 text-base leading-relaxed line-clamp-3">
          {Paragraph}
        </p>
      </div>


    </div>
  );
};

export default BlogCard;
