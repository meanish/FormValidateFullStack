import { CKEditor } from '@ckeditor/ckeditor5-react';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MyUploadAdapter from "../../Adapter/MyUploadAdapter";
import Editor from 'ckeditor5-custom-build';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { contentonly, storeContent } from '../../store/slices/blogSlices';



const editorConfiguration = {
    toolbar: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'outdent',
        'indent',
        '|',
        'base64uploadadapter',
        // 'imageUpload',
        'blockQuote',
        'insertTable',
        'mediaEmbed',
        'undo',
        'redo'
    ],
}


const UploadForm = ({ token, id }) => {
    const currStore = useSelector((state) => state.blog.currBlog);

    const navigate = useNavigate();
    const { content: contentFromStore = '', title: titleFromStore = '', featured_image: imageFomStore = '' } = currStore;
    const [featured_image, setFeatured_image] = useState(null);
    const [title, setTitle] = useState(titleFromStore);
    const [currImage, setCurrImage] = useState(imageFomStore);
    const dispatch = useDispatch();


    useEffect(() => {
        if (imageFomStore) {
            setCurrImage(imageFomStore);
        }
    }, [imageFomStore]);

    const imageChangeHandler = (e) => {
        const file = e.target.files[0];
        setFeatured_image(file);
        setCurrImage(URL.createObjectURL(file));
    };


    const handleEditorChange = (value) => {
        dispatch(contentonly(value));
    };

    const uploadblogHandler = async () => {
        const tempContainer = document.createElement("div");
        tempContainer.innerHTML = contentFromStore;

       

        try {
            // if (contentFromStore.length < 32) {
            //   alert("At least 32 words needed to create a blog post");
            //   return;
            // } else if (headingTags.length === 0 || paragraphTags.length === 0) {
            //   alert("The content must include at least one heading and a paragraph.");
            //   return;
            // } else if (token) {


            const formData = new FormData();
            formData.append("content", contentFromStore)
            formData.append("featured_image", featured_image)
            formData.append("title", title)


            const headers = {
                Authorization: `Bearer ${token}`,
            };


            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_SERVER}/blog/create`,
                {
                    method: "POST",
                    headers: headers,
                    body: formData,
                }
            );

            if (response.ok) {
                // const responseData = await response.json();
                toast.success("Blog uploaded successfully!");
                navigate("/");
            } else {
                const errorData = await response.json();
                toast.error(errorData.error || "Failed to upload blog.");
            }
        } catch (error) {
            toast.error("An error occurred while updating the blog.");
        }
    };

    const updateblogHandler = async () => {

        try {
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const formData = new FormData();
            formData.append("content", contentFromStore);
            formData.append("featured_image", featured_image);
            formData.append("title", title);
            formData.append("id", id);

            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_SERVER}/blog/updateblog`,
                {
                    method: "POST",
                    headers: headers,
                    body: formData,
                }
            );

            if (response.ok) {
                // const responseData = await response.json();
                toast.success("Blog updated successfully!");
                navigate("/myblog");
            } else {
                const errorData = await response.json();
                alert(errorData.error || "Failed to update blog.");
            }
        } catch (error) {
            toast.error("An error occurred while updating the blog.");
        }
    };



    return (
        <>
            <div className="blog-editor flex flex-col gap-8 bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto mt-10">
                {/* Title Section */}
                <div className="title">
                    <label className="text-xl font-semibold text-gray-800">Title:</label>
                    <input
                        placeholder="Enter the title of the article"
                        className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                {/* Image Upload Section */}
                <div className="image">
                    <label className="text-xl font-semibold text-gray-800">Upload Image:</label>
                    <input
                        type="file"
                        className="mt-2 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        onChange={(e) => imageChangeHandler(e)}
                    />
                </div>

                {/* Image Preview Section */}
                {currImage && (
                    <div className="view_image flex justify-center mt-4">
                        <img
                            src={currImage}
                            alt="Uploaded Preview"
                            className="max-h-60 rounded-lg shadow-md"
                        />
                    </div>
                )}

                {/* CKEditor Content Section */}
                <div className="editor">
                    <label className="text-xl font-semibold text-gray-800">Content:</label>

                    <CKEditor
                        editor={Editor}
                        config={editorConfiguration}
                        data={contentFromStore}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            handleEditorChange(data)

                        }}
                    />

                    {/* 
                    export default CustomWriteEditor;

                    <CKEditor
                        editor={Editor}
                        data={contentFromStore}
                        ref={editorRef}
                        onReady={(editor) => {
                            editorRef.current = editor;
                            editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
                                return new MyUploadAdapter(loader);
                            };
                        }}
                        onChange={handleEditorChange}
                        className="mt-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    /> */}
                </div>
            </div>

            {/* Button Section */}
            <div className="flex justify-center gap-6 mt-6">
                {!id ? (
                    <div className="bg-green-500 text-blue px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition-all duration-200">
                        <button
                            onClick={uploadblogHandler}
                            className="bg-green-500 text-white"
                        >
                            Upload
                        </button>
                    </div>

                ) : (

                    <div className="bg-green-500 text-blue px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition-all duration-200">
                        <button
                            onClick={updateblogHandler}
                            className="bg-green-500 text-white"

                        >
                            Update
                        </button>
                    </div>
                )}
            </div>
        </>
    );

};

export default UploadForm;
