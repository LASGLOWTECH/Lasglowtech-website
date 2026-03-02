import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import instance from "../config/axios.config";
import RelatedPosts from "../components/sections/relatedposts";
import Subscription from "../components/sections/subscription";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoShareSocialSharp } from "react-icons/io5";
import moment from "moment";
import { Osaz } from "../components/images";
import { RingLoader } from "react-spinners";
import SEO from "../utils/seo";

const BlogDetails = () => {
  const { slug } = useParams();
  const decodedSlug = decodeURIComponent(slug);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);

  // ✅ Fetch blog by SLUG
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await instance.get(`/posts/${decodedSlug}`);
        setPost(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch the blog post.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [decodedSlug]);

  // ✅ Share handler (slug-based)
  const handleShare = () => {
    const baseUrl =
      window.location.hostname === "localhost"
        ? "http://localhost:5173"
        : "https://lasglowtech.com.ng";

    const shareUrl = `${baseUrl}/blog/${post.slug}`;

    if (navigator.share) {
      navigator
        .share({
          title: post.title,
          text: "Check out this article!",
          url: shareUrl,
        })
        .catch((err) => console.error("Share error:", err));
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    }
  };

  // ✅ Skeleton Loading Component
  const SkeletonLoader = () => (
    <div className="bg-bgcolor text-white py-16">
      <div className="max-w-5xl mx-auto px-6 lg:px-0">
        {/* Skeleton Back Button */}
        <div className="mb-6 h-8 w-20 bg-gradient-to-r from-gray-700 to-gray-800 rounded animate-pulse" />

        {/* Skeleton Title */}
        <div className="mb-6 space-y-3">
          <div className="h-10 bg-gradient-to-r from-gray-700 to-gray-800 rounded animate-pulse" />
          <div className="h-10 w-3/4 bg-gradient-to-r from-gray-700 to-gray-800 rounded animate-pulse" />
        </div>

        {/* Skeleton Cover Image */}
        <div className="rounded-xl overflow-hidden mb-8 border border-gray-700 h-96 bg-gradient-to-r from-gray-700 to-gray-800 animate-pulse" />

        {/* Skeleton Meta */}
        <div className="flex flex-wrap justify-between items-center mb-10 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-700 to-gray-800 animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gradient-to-r from-gray-700 to-gray-800 rounded animate-pulse" />
              <div className="h-4 w-32 bg-gradient-to-r from-gray-700 to-gray-800 rounded animate-pulse" />
            </div>
          </div>
          <div className="h-10 w-32 bg-gradient-to-r from-gray-700 to-gray-800 rounded animate-pulse" />
        </div>

        {/* Skeleton Content */}
        <div className="space-y-3">
          <div className="h-4 bg-gradient-to-r from-gray-700 to-gray-800 rounded animate-pulse" />
          <div className="h-4 bg-gradient-to-r from-gray-700 to-gray-800 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-gradient-to-r from-gray-700 to-gray-800 rounded animate-pulse" />
          <div className="h-4 bg-gradient-to-r from-gray-700 to-gray-800 rounded animate-pulse" />
          <div className="h-4 w-4/5 bg-gradient-to-r from-gray-700 to-gray-800 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  if (!post) {
    return <div className="text-center py-20 text-gray-400">Blog not found</div>;
  }

  return (
    <div className="bg-bgcolor text-white py-16">
      <SEO
        title={`${post.title} | Lasglowtech Blogs`}
        description={(post.content || "").replace(/<[^>]+>/g, "").slice(0, 160)}
        keywords="Lasglowtech blog, digital insights, development tips"
        url={`https://www.lasglowtech.com.ng/blog/${post.slug}`}
        image={post.coverUrl}
        type="article"
        schema={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          image: post.coverUrl,
          datePublished: post.timestamp,
          author: {
            "@type": "Organization",
            name: "Lasglowtech",
          },
          publisher: {
            "@type": "Organization",
            name: "Lasglowtech",
            logo: {
              "@type": "ImageObject",
              url: "https://www.lasglowtech.com.ng/LOGO.png",
            },
          },
          mainEntityOfPage: `https://www.lasglowtech.com.ng/blog/${post.slug}`,
        }}
      />
      <div className="max-w-5xl mx-auto px-6 lg:px-0">

        {/* Back */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-violet-500 hover:text-violet-400 font-semibold"
          >
            <FaArrowLeftLong className="mr-2" /> Back
          </button>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold text-textcolor2 mb-6">
          {post.title}
        </h1>

        {/* Cover */}
        {post.cover && (
          <div className="rounded-xl overflow-hidden mb-8 border border-gray-700">
            <img
              src={post.coverUrl || `https://lasglowserver.phoenixstech.com/uploads/images/${post.cover}`}
              alt={post.title}
              loading="lazy"
              className="w-full max-h-[480px] object-cover"
            />
          </div>
        )}

        {/* Meta */}
        <div className="flex flex-wrap justify-between items-center text-sm text-gray-400 mb-10">
          <div className="flex items-center gap-3">
            <img src={Osaz} alt="author" className="w-8 h-8 rounded-full" />
            <span className="font-medium text-gray-300">Lasglowtech</span>
            <span>• {moment(post.timestamp).format("MMMM D, YYYY")}</span>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 bg-gradient-to-r from-Primarycolor to-Primarycolor1 hover:from-Secondarycolor hover:to-Secondarycolor px-4 py-2 rounded-md shadow"
          >
            Share <IoShareSocialSharp />
          </button>
        </div>

        {/* Content */}
        <div className=" text-base font-light  prose prose-invert prose-lg max-w-none text-gray-300   leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }} />

        {/* Related */}
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
