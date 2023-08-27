import React from "react";
import { NavLink } from "react-router-dom";
import CardButton from "../../helper/Button";

const token = localStorage.getItem("authToken");

const MyblogCard = ({ Paragraph, Heading, Image, val }) => {
  const deleteHandler = async (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch("/blog/deleteblog", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ contentId: id }),
    });
    if (response.ok) {
      const responseData = await response.json(); // Parse JSON response
      alert(responseData.message); // Display success message
    } else {
      const errorData = await response.json(); // Parse JSON error response
      alert(errorData.error); // Display error message
    }
  };
  return (
    <div
      className="rounded-lg sm:overflow-hidden my-12"
      style={{
        boxShadow: "17px 17px 2px -9px #019B93",
      }}
    >
      <NavLink
        to={`/blog/${val._id}`}
        className="flex flex-col lg:flex-row md:flex-col  items-center bg-sky hover:bg-hoversky  w-full rounded-lg border-t border-orange"
      >
        <div className="lg:w-1/3 sm:w-auto md:w-full">
          <img
            className="object-cover w-full lg:h-64  h-auto md:rounded-l-lg"
            src={Image}
            alt="blog_image"
          />
        </div>

        <div className="flex flex-col justify-between p-4 leading-normal lg:w-2/3 sm:w-full md:w-full">
          <h5 className=" uppercase w-full overflow-hidden mb-2 sm:text-2xl font-bold font-head text-dark">
            {Heading}
          </h5>
          <p className="my-7 text-md font-normal text-text tracking-tight overflow-hidden overflow-ellipsis truncate-multiline-3">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
          <div className="button-section flex flex-col sm:flex-row md:flex-row gap-5 lg:w-1/2 justify-center sm:justify-start ">
            <CardButton props="View" />
            <CardButton props="Edit" />
            <CardButton props="Delete" onClick={() => deleteHandler(val._id)} />
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default MyblogCard;

// mb-2 uppercase text-3xl font-bold font-head text-dark overflow-hidden overflow-ellipsis sm:text-2xl sm:w-10 xs:w-10 md:w-20 lg:w-20 border border-yellow
