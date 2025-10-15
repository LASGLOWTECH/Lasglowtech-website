import { FaCirclePlus } from "react-icons/fa6";
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import instance from '../../config/axios.config';
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Update = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state || {};
  const postid = state.postid;

  const [content, setContent] = useState(state?.content || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [existingImage, setExistingImage] = useState(state?.cover || "");
  const [shares, setShares] = useState(state?.shares || 0);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await instance.post("/upload/images", formData);
      return res.data; // Image URL
    } catch (error) {
      console.error("Upload Error:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cover = file ? await upload() : existingImage;

    try {
      if (postid) {
        await instance.put(`/posts/${postid}`, {
          title,
          content,
          shares,
          cover,
        });
        toast.success('Blog updated successfully!');
      } else {
        await instance.post(`/posts`, {
          title,
          content,
          shares,
          cover,
        });
        toast.success('Blog created successfully!');
      }
      navigate("/blogs");
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Unable to submit blog. Please try again.');
      }
    }
  };

  return (
    <div className="write my-10 mx-auto px-4 sm:px-6 lg:px-12">
      <div className="">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {postid ? "Update Blog" : "Create New Blog"}
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            className="w-full border-none p-4 text-lg bg-[#F6F5FA] focus:outline-none focus:ring-2 rounded-md"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="h-[300px] overflow-scroll">
            <ReactQuill
              className="text-gray-900 h-full w-full border-none p-4 text-lg bg-gray-50 rounded-md"
              theme="snow"
              value={content}
              onChange={setContent}
            />
          </div>

          <div className="flex flex-col items-start">
            <input
              type="file"
              id="file"
              className="hidden"
              onChange={(e) => {
                const selectedFile = e.target.files[0];
                setFile(selectedFile);
                if (selectedFile) {
                  setExistingImage(URL.createObjectURL(selectedFile));
                }
              }}
            />
            <label
              htmlFor="file"
              className="text-Darkash py-4 flex items-center font-medium cursor-pointer"
            >
              <FaCirclePlus className="text-4xl fill-Primarycolor" />
              <p className="ml-3 hidden md:block">Upload Cover</p>
            </label>

            {existingImage && (
              <img
                src={existingImage}
                alt="Post Cover"
                className="mt-2 w-full rounded-md object-cover"
              />
            )}
          </div>

          <div className="mt-4">
            <button
              className="px-6 py-3 bg-gradient-to-r from-Primarycolor to-Primarycolor1 hover:from-Secondarycolor hover:to-Secondarycolor1 shadow-md text-white font-semibold rounded-md transition-all duration-300"
              onClick={handleSubmit}
            >
              {postid ? "Update" : "Publish"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
