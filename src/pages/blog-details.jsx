import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Osaz } from "../components/images";
import { useState, useEffect } from "react";
import instance from "../config/axios.config";
import RelatedPosts from "../components/sections/relatedposts";
import Subscription from "../components/sections/subscription";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoShareSocialSharp } from "react-icons/io5";
import moment from "moment";

const BlogDetails = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);
  const [shares, setShares] = useState({});
  const { slug } = useParams();
  const navigate = useNavigate();

  // Fetch single post by slug (fallback to ID if not found)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Try fetching by slug first
        const res = await instance.get(`/posts/slug/${slug}`);
        setPost(res.data);
      } catch (error) {
        // If 404, fallback to fetching by ID
        if (error.response && error.response.status === 404 && !isNaN(slug)) {
          try {
            const res = await instance.get(`/posts/${slug}`);
            setPost(res.data);
          } catch (innerError) {
            setError("Failed to fetch the post.");
            console.error(innerError);
          }
        } else {
          setError("Failed to fetch the post.");
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  // Track shares when post is loaded
  useEffect(() => {
    if (post && post.slug) {
      setShares((prev) => ({
        ...prev,
        [post.slug]: prev[post.slug] || 0,
      }));
    }
  }, [post]);

  // Handle delete post
  const handleDelete = async () => {
    try {
      await instance.delete(`/posts/${post.id}`);
      navigate("/blog");
    } catch (error) {
      setError("Can't delete post");
      console.error("Delete error:", error);
    }
  };

  // Handle share action
  const handleShare = (slug) => {
    const baseUrl =
      window.location.hostname === "localhost"
        ? "http://localhost:5173"
        : "https://lasglowtech.com";

    const shareUrl = `${baseUrl}/blog/${slug}`;

    if (navigator.share) {
      navigator
        .share({
          title: post.title,
          text: "Check out this blog!",
          url: shareUrl,
        })
        .then(() => {
          setShares((prev) => ({
            ...prev,
            [slug]: (prev[slug] || 0) + 1,
          }));
        })
        .catch((error) => console.error("Error sharing:", error));
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Link copied: " + shareUrl);
    }
  };

  // Loading state
  if (loading)
    return <div className="text-black text-center mt-20">Loading...</div>;

  // Error state
  if (error) return <div className="text-black text-center mt-20">{error}</div>;

  if (!post)


    return (
      <div className="text-center py-10 text-gray-600">Blog not found</div>
    );

  return (
    <div className="bg-bgcolor text-white py-16">
      <div className="max-w-5xl mx-auto px-6 lg:px-0">
        {/* Back link */}
        <div
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-Primarycolor cursor-pointer hover:text-Primarycolor1 transition-all"
        >
          <FaArrowLeftLong size={18} />
          <span className="font-medium text-sm">Back</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold leading-snug text-textcolor2 mb-6">
          {post.title}
        </h1>

        {/* Cover Image */}
        {post.cover && (
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-700 mb-8">
            <img
              src={
                window.location.hostname === "localhost"
                  ? `/upload/images/${encodeURIComponent(post.cover)}`
                  : `https://lasglowserver.phoenixstech.com/uploads/images/${encodeURIComponent(
                      post.cover
                    )}`
              }
              alt="Blog cover"
              className="w-full object-cover max-h-[480px]"
            />
          </div>
        )}

        {/* Meta Info */}
        <div className="flex flex-wrap items-center justify-between text-sm text-gray-400 mb-10">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <img
                src={Osaz}
                alt="author"
                className="w-8 h-8 rounded-full"
              />
              <span className="font-medium text-gray-300">Lasglowtech</span>
            </div>
            <span className="text-gray-500">
              • {moment(post.timestamp).format("MMMM D, YYYY")}
            </span>
          </div>



<button
            className="flex items-center gap-2 text-sm bg-gradient-to-r from-Primarycolor to-Primarycolor1 hover:from-Secondarycolor hover:to-Secondarycolor text-white px-4 py-2 rounded-md shadow-md transition-all"
            onClick={() => handleShare(post.slug || post.id)}
          >
            Share <IoShareSocialSharp className="text-lg" />
          </button>
        
        </div>

        {/* Blog Content */}
        <div
          className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Related Posts */}
        <div className="mt-16 border-t border-gray-800 pt-10">
      <RelatedPosts currentPostId={post.id} />
        </div>

        {/* Subscription */}
        <div className="mt-20">
          <Subscription />
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
