import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../config/axios.config";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from 'react-toastify';

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.get("/posts");
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const deleteBlog = async (id) => {
    try {
      await instance.delete(`/posts/${id}`);
      setPosts(posts.filter(post => post.id !== id));
      toast.success('Blog deleted successfully!');
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error(error.response?.data?.error || "Delete failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Blog List</h1>

      <div className="space-y-4">
        {posts.map((blog) => (
          <div
            key={blog.id}
            className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md border border-gray-300"
          >
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full">
              <p className="text-lg font-semibold text-gray-800 w-full sm:w-1/3 truncate">{blog.title}</p>
                  <p className="text-lg font-semibold text-gray-800 w-full sm:w-1/3 truncate">{blog.content}</p>
              <p className="text-sm text-gray-600 w-full sm:w-1/3">
                Posted:{" "}
                {new Date(blog.timestamp).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <div className="flex gap-4 sm:ml-auto">
                <button
                  onClick={() =>
                    navigate("/dashboard/updateblog", {
                      state: {
                        postid: blog.id,
                        title: blog.title,
                        content: blog.content,
                        shares: blog.shares,
                        cover: blog.cover,
                      },
                    })
                  }
                  className="text-blue-600 hover:text-blue-800"
                  title="Edit"
                >
                  <FaEdit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => deleteBlog(blog.id)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <FaTrash className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
