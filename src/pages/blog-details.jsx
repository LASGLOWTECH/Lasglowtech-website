import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import instance from "../config/axios.config";
import RelatedPosts from "../components/sections/relatedposts";
import Subscription from "../components/sections/subscription";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoShareSocialSharp } from "react-icons/io5";
import moment from "moment/moment";
import { PiArrowCircleUpRightFill } from "react-icons/pi";

const BlogDetails = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null); // single blog post
  const [shares, setShares] = useState({});

  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];

  // Fetch blog post
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (error) {
        setError("Failed to fetch the post.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [postId]);

  // Track shares
  useEffect(() => {
    if (post && post.id) {
      setShares((prev) => ({
        ...prev,
        [post.id]: prev[post.id] || 0,
      }));
    }
  }, [post]);

  // Handle post deletion
  const handleDelete = async () => {
    try {
      await instance.delete(`/posts/${postId}`);
      navigate("/blog");
    } catch (error) {
      setError("Can't delete post");
      console.error("Delete error:", error);
    }
  };

  // Handle share action
  const handleShare = (blogId) => {
    if (navigator.share) {
      navigator
        .share({
          title: "Check this blog!",
          text: "Hey, look at this interesting blog!",
          url: window.location.href,
        })
        .then(() => {
          setShares((prev) => ({
            ...prev,
            [blogId]: (prev[blogId] || 0) + 1,
          }));
        })
        .catch((error) => console.error("Error sharing:", error));
    } else {
      alert("Sharing is not supported on this device.");
    }
  };

  // Loading state
  if (loading) return <div className="text-black">Loading...</div>;

  // Error state
  if (error) return <div className="text-black">{error}</div>;

  // Post not found
  if (!post) return <div className="text-black text-center mt-10">Blog not found</div>;

  return (
    <div className="bg-bgcolor py-16">
      <div className="md:px-20 px-6 mx-auto rounded-lg overflow-hidden">
        {/* Back Button */}
        <div className="p-3 border-b border-gray-200">
          <Link onClick={() => navigate(-1)} className="flex items-center text-violet-700 hover:text-textcolor2 text-lg font-semibold">
            <FaArrowLeftLong className="mr-2" size={20} />
            Back
          </Link>
        </div>

        {/* Cover Image */}
        {/* Cover Image */}
        <div className="relative">


          {post.cover && (
            <img
              className="w-full max-h-[600px] object-cover rounded-small shadow-md shadow-Primarycolor"
              src={
                window.location.hostname === "localhost"
                  ? `/upload/images/${encodeURIComponent(post.cover)}`
                  : `https://lasglowserver.phoenixstech.com/uploads/images/${encodeURIComponent(post.cover)}`
              }
              alt="blog"
            />
          )}

        </div>

        {/* Blog Title */}
        <h2 className="md:text-4xl text-textcolor2 mt-5 py-4  text-3xl font-semibold">
          {post.title}
        </h2>

        {/* Blog Meta */}
        <div className="flex justify-left flex-row items-center gap-2 mb-6">
          <p className="text-gray-500 pe-6 text-[14px]">
            Posted {moment(post.timestamp).fromNow()}
          </p>
          <button
          className="bg-gradient-to-r from-Primarycolor to-Primarycolor1 hover:from-Secondarycolor hover:to-Secondarycolor shadow-md text-white font-semibold py-2 px-5 rounded-md transition-all duration-300 flex items-center gap-2"
          onClick={() => handleShare(post.id)}
        >
          Share <IoShareSocialSharp fill="white" className="text-lg" />
        </button>
         
        </div>

        {/* Share Button */}
       

        {/* Blog Content */}

        <p className="text-gray-400 text-base md:text-lg my-4" dangerouslySetInnerHTML={{ __html: post.content }}></p>


        <RelatedPosts currentPostId={postId} />

        {/* Subscription Section */}



      </div>
      <Subscription />

    </div>
  );
};

export default BlogDetails;
