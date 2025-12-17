import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import instance from "../../config/axios.config";
import { PiArrowCircleUpRightFill } from "react-icons/pi";

const RelatedPosts = ({ currentPostId }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await instance.get("/posts");

        // Exclude current post
        const filtered = res.data.filter(
          (post) => post.id !== currentPostId
        );

        // Shuffle & pick 3
        const shuffled = filtered
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);

        setRelatedPosts(shuffled);
      } catch (err) {
        console.error(err);
        setError("Failed to load related posts.");
      }
    };

    fetchRelated();
  }, [currentPostId]);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h3 className="text-3xl font-semibold text-textcolor2 mb-6">
        Related Posts
      </h3>

      <div className="grid md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.slug}`}
            className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 overflow-hidden"
          >
            <img
              src={
                window.location.hostname === "localhost"
                  ? `/upload/images/${post.cover}`
                  : `https://lasglowserver.phoenixstech.com/uploads/images/${post.cover}`
              }
              alt={post.title}
              className="w-full h-[200px] object-cover"
            />

            <div className="p-4">
              <h4 className="text-xl font-bold text-gray-800">
                {post.title}
              </h4>

              <p className="text-sm text-gray-500 mt-2">
                Posted{" "}
                {new Date(post.timestamp).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              <div className="flex items-center text-Primarycolor gap-1 mt-2 font-semibold">
                Read More <PiArrowCircleUpRightFill />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;
