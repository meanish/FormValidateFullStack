import React, { useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { storeContent } from "../../store/slices/blogSlices";
import { useDispatch, useSelector } from "react-redux";
import MyUploadAdapter from "../../Adapter/MyUploadAdapter";

const token = localStorage.getItem("authToken");

const Update = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const contentFromStore = useSelector((state) => state.blog.content);
  const { id } = useParams();

  useEffect(() => {
    const GetSingleBlog = async () => {
      if (!token) {
        navigate("/");
      }
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
        if (data.error) {
          alert(data.error);
          window.location.href = "/";
        } else {
          dispatch(storeContent(data.content));
        }
      } else {
        dispatch(storeContent({}));
      }
    };
    GetSingleBlog();
  }, []);

  const removeHandler = async () => {
    try {
      if (token) {
        const config = {
          headers: {
            authorization: `Bearer ${token}`, //throws a token
          },
        };
        await axios.get("/logout", config);
        localStorage.removeItem("authToken");
        navigate("/");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const removeAccHandler = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to remove your account? This action cannot be undone."
    );

    if (confirmed) {
      try {
        const config = {
          headers: {
            authorization: `Bearer ${token}`, //throws a token
          },
        };
        await axios.delete("/logout", config);
        localStorage.removeItem("authToken");
        navigate("/");
      } catch (error) {
        console.error("Error during account removal:", error);
      }
    }
  };

  const handleEditorChange = (event, editor) => {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return new MyUploadAdapter(loader);
    };

    console.log("Backend Server URL:", process.env.backendserver);

    const data = editor.getData();
    console.log(data); // Log the editor content

    const absoluteContent = data.replace(
      /src="uploads\//g,
      `src="${process.env.REACT_APP_BACKEND_SERVER}/uploads/`
    );

    console.log("When vbeing called", absoluteContent);

    dispatch(storeContent(absoluteContent));
  };

  const uploadblogHandler = async () => {
    const tempContainer = document.createElement("div"); //create a decoy div
    tempContainer.innerHTML = contentFromStore;

    const headingTags = tempContainer.querySelectorAll(
      "h1, h2, h3, h4, h5, h6"
    );
    const paragraphTags = tempContainer.querySelectorAll("p");

    try {
      if (contentFromStore.length < 32) {
        alert("Atleast 32 words needed to create a blog post");
        return;
      } else if (headingTags.length === 0 || paragraphTags.length === 0) {
        alert("The content must include at least one heading and a paragraph.");
        return;
      } else if (token) {
        console.log("WHat is token here", token);
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        await fetch("/blog/create", {
          method: "POST",
          headers: headers,
          body: JSON.stringify({ content: contentFromStore }),
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Error uploading the blog", error);
    }
  };

  const updateblogHandler = async () => {
    try {
      if (contentFromStore.length < 32) {
        alert("Atleast 32 words needed to create a blog post");
      } else if (token) {
        console.log("What is token here", token);
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        await fetch("/blog/updateblog", {
          method: "POST",
          headers: headers,
          body: JSON.stringify({ id, content: contentFromStore }),
        });
      }
    } catch (error) {
      console.error("Error updating the blog", error);
    }
  };

  return (
    <div>
      <h1>Means youre loggin in the system</h1>
      <div className="blog-editor">
        <CKEditor
          editor={Editor}
          data={contentFromStore}
          ref={editorRef}
          onReady={(editor) => {
            editorRef.current = editor;
            // Configure extra plugins, including the custom upload adapter
            editor.plugins.get("FileRepository").createUploadAdapter = (
              loader
            ) => {
              return new MyUploadAdapter(loader);
            };
          }}
          onChange={handleEditorChange}
        />
      </div>
      <div>
        {!id ? (
          <button onClick={uploadblogHandler}>Upload</button>
        ) : (
          <button onClick={updateblogHandler}>Update</button>
        )}
      </div>
      <button onClick={removeHandler}>Logout</button>
      <button onClick={removeAccHandler}>Remove Account</button>
    </div>
  );
};

export default Update;
