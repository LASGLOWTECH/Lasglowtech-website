import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../config/axios.config";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const stripHtml = (html = "") => (html || "").replace(/<[^>]+>/g, "").trim();

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.get("/posts");
        setPosts(res.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const deleteBlog = async (id) => {
    try {
      await instance.delete(`/posts/${id}`);
      setPosts((prev) => prev.filter((post) => post.id !== id));
      toast.success("Blog deleted successfully.");
    } catch (error) {
      toast.error(error.response?.data?.error || "Delete failed.");
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "—";
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section className="rounded-2xl border border-Primarycolor/25 bg-bgcolor2/40 overflow-hidden">
      <div className="px-6 py-5 border-b border-Primarycolor/20 bg-bgcolor/30">
        <h1 className="text-xl font-semibold text-textcolor2">Blog list</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage blog content and keep articles fresh.</p>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {posts.map((blog) => (
            <article
              key={blog.id}
              className="rounded-xl border border-Primarycolor/20 bg-bgcolor/50 p-5 hover:border-Primarycolor/30 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-textcolor2 text-lg">{blog.title}</h3>
                  <p className="text-sm text-gray-400 mt-1 line-clamp-2">{stripHtml(blog.content)}</p>
                  <p className="text-xs text-gray-500 mt-2">{formatDate(blog.timestamp)}</p>
                </div>
                <div className="flex flex-wrap gap-2 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      navigate("/dashboard/updateblog", {
                        state: {
                          postid: blog.id,
                          title: blog.title,
                          content: blog.content,
                          shares: blog.shares,
                          cover: blog.coverUrl || blog.cover,
                        },
                      })
                    }
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-Primarycolor/40 text-Secondarycolor hover:bg-Primarycolor/20 text-sm font-medium transition-colors"
                    title="Edit"
                  >
                    <FaEdit className="w-4 h-4" /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteBlog(blog.id)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-400/50 text-red-300 hover:bg-red-500/10 text-sm font-medium transition-colors"
                    title="Delete"
                  >
                    <FaTrash className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
          {!posts.length && (
            <p className="text-gray-400 text-center py-12">No blog posts found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogList;
