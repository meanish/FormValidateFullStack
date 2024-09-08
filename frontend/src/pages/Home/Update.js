import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { storeContent } from "../../store/slices/blogSlices";
import { useDispatch } from "react-redux";
import UploadForm from "../components/upload_form";

const token = localStorage.getItem("authToken");

const Update = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const GetSingleBlog = async () => {
      if (!token) {
        navigate("/");
        return;
      }

      if (id) {
        try {
          const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          };

          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_SERVER}/blog/singleblog`,
            {
              method: "POST",
              headers: headers,
              body: JSON.stringify({ id: id }),
            }
          );

          const res = await response.json();
          const { data } = res;

          if (res.error) {
            alert(res.error);
            navigate("/");
          } else {
            dispatch(storeContent(data));
          }
        } catch (error) {
          console.error("Error fetching blog data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        dispatch(storeContent({}));
        setLoading(false);
      }
    };

    GetSingleBlog();
  }, [id,  navigate, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="container mx-auto p-4 blue_bg rounded-lg shadow-lg">
        <div className="flex flex-col items-center h-full">
          <h1 className="py-5 text-center text-blue text-4xl font-extrabold">
            {id ? "Update Your Blog" : "Create a New Blog"}
          </h1>
          <div className="upload_form w-full py-3">
            <UploadForm token={token} id={id} />
          </div>
        </div>
      </div>
    </div>
  );

};

export default Update;
