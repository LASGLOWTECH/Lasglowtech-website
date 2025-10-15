import { FaCirclePlus } from "react-icons/fa6";
import  { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import instance from '../../config/axios.config';
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Create = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state || {};
  const postid = state.postid;

  const [content, setContent] = useState(state?.content || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [existingImage, setExistingImage] = useState(state?.cover || "");
  const [shares, setShares] = useState(state?.shares || 0);

  // ✅ WORKING UPLOAD FUNCTION
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await instance.post("/upload/images", formData);
      return res.data; // returns filename like "1747454546-image.jpg"
    } catch (error) {
      console.error("Upload Error:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploaded = file ? await upload() : null;

    const isLocal = window.location.hostname === "localhost";
    const cover = uploaded
      ? isLocal
        ? `/upload/images/${uploaded}`
        : `https://nodeserver.phoenixstech.com/uploads/images/${uploaded}`
      : existingImage;

    try {
      if (postid) {
        await instance.put(`/posts/${postid}`, {
          title,
          content,
          shares,
          cover,
        });
      } else {
        await instance.post(`/posts`, {
          title,
          content,
          shares,
          cover,
        });
      }

      toast.success('Blog created successfully!');
      navigate("/blogs");
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Unable to create blog. Please try again.');
      }
    }
  };

  return (
    <div className="write my-10 mx-auto">
      <div>
        <h1 className="text-2xl px-6 font-bold text-gray-800 mb-4">Create New Blog</h1>

        <input
          type="text"
          className="w-full border-none p-4 text-lg bg-[#F6F5FA] focus:outline-none focus:ring-2 rounded-md"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className='h-[300px] min-w-full overflow-scroll border-none'>
          <ReactQuill
            className='text-gray-900 h-full w-full p-4 text-lg bg-gray-50 rounded-md'
            theme="snow"
            value={content}
            onChange={setContent}
          />
        </div>

        <div className='mx-3 col-span-1'>
          <div className='flex flex-col'>
            <input
              type='file'
              id='file'
              className='hidden'
              onChange={(e) => setFile(e.target.files[0])}
            />

            <label htmlFor='file' className='text-gray-700 py-4 flex items-center font-medium cursor-pointer'>
              <span className="flex items-center">
                <FaCirclePlus className="text-4xl fill-Primarycolor" />
                <p className="ml-3 hidden md:block">Upload Cover</p>
              </span>
              <button
                className='ml-auto px-6 py-3 bg-gradient-to-r from-Primarycolor to-Primarycolor1 hover:from-Secondarycolor hover:to-Secondarycolor1 shadow-md text-white font-semibold rounded-md transition-all duration-300'
                onClick={handleSubmit}
              >
                Publish
              </button>
            </label>

            {existingImage && !file && (
              <img
                src={
                  existingImage.startsWith('http') || isLocal
                    ? existingImage
                    : `https://nodeserver.phoenixstech.com/uploads/images/${existingImage}`
                }
                alt="Current Post"
                className="mt-2 w-full rounded-md"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
