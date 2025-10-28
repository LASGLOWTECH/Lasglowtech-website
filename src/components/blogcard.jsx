import React, { useState, useEffect } from "react";
// 
import instance from "../config/axios.config";
import { IoShareSocialSharp } from "react-icons/io5";
import { PiArrowCircleUpRightFill } from "react-icons/pi";
import { Link } from "react-router-dom";

const Blogcard = () => {
    const blogsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);


    const [posts, setPosts] = useState([]);

    const fetchDta = async () => {
        try {
            console.log("Fetching data from backend...");
            const res = await instance.get("/posts");

            console.log("Response received:", res.data);  // Log response data
            setPosts(res.data);
        } catch (error) {
            console.error("Error fetching data:", error);  // Log the error
        }
    };


    useEffect(() => {
        console.log("useEffect triggered");
        fetchDta()





    }, [])


    const totalPages = Math.ceil(posts.length / blogsPerPage);

    // Get the blogs for the current page
    const currentBlogs = posts.slice(
        (currentPage - 1) * blogsPerPage,
        currentPage * blogsPerPage
    );

    // State to store the share count for each blog post
    const [shares, setShares] = useState(
        posts.reduce((acc, blog) => {
            acc[blog.blogid] = blog.shares || 0;
            return acc;
        }, {})
    );

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Function to handle sharing and updating the share count
    const handleShare = (blogid) => {
        if (navigator.share) {
            navigator
                .share({
                    title: "Check this blog!",
                    text: "Hey, look at this interesting blog!",
                    url: window.location.href,
                })
                .then(() => {
                    // Increment the share count for the blog
                    setShares((prevShares) => ({
                        ...prevShares,
                        [blogid]: prevShares[blogid] + 1,
                    }));
                    console.log("Shared successfully");
                })
                .catch((error) => console.error("Error sharing:", error));
        } else {
            alert("Sharing is not supported on this device.");
        }
    };

    return (
        <div className="py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-8 px-6 md:px-20">
                {currentBlogs.map((blog, index) => (
                    <div
                        key={index}
                        className="block  bg-gradient-to-t from-bgcolor to-bgcolor2 hover:shadow-none  p-5 rounded-lg shadow-md shadow-Primarycolor text-left transition-colors duration-300"
                    >

                        <Link to={`/blog/${blog.id}`} key={blog.id} className="block">

                            <img
                                src={
                                    window.location.hostname === "localhost"
                                        ? `/upload/images/${blog.cover}`
                                        : `https://lasglowserver.phoenixstech.com/uploads/images/${blog.cover}`
                                }
                                alt="blog"
                                className="w-full h-fit md:h-auto lg:h-fit xl:h-64 object-cover rounded-md"
                            />
                            <h4 className="md:text-2xl text-[#F5F7FA] font-semibold py-4">
                                {blog.title}
                            </h4>
                        </Link>
                        <div className="flex justify-left items-center">

                            <p className="text-grey-100 pe-6 text-[14px]">
                                {blog.date}
                            </p>
                            <div
                                onClick={() => handleShare(blog.blogid)}
                                className="cursor-pointer"
                            >
                                <IoShareSocialSharp fill="white" className="text-2xl" />
                            </div>
                          
                        </div>


                        <p className="text-grey-100 text-base my-4 line-clamp-3" dangerouslySetInnerHTML={{ __html: blog.content }}  >{blog.content}</p>


                        <Link to={`/blog/${blog.id}`}>

                            <div className="flex items-center pt-6 group cursor-pointer transition-all duration-500">
                                <p className="ml-2 text-[#F5F7FA] font-medium transition-all duration-500">
                                    Read Article
                                </p>
                                <span className="transition-transform duration-500 ease-in-out">
                                    <PiArrowCircleUpRightFill className="w-8 h-8 fill-Secondarycolor" />
                                </span>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-10 space-x-6">
                <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className="bg-gradient-to-r from-Primarycolor to-Primarycolor1 hover:from-Secondarycolor hover:to-Secondarycolor1 text-white font-semibold py-2 px-4 rounded-tl-full rounded-bl-full disabled:opacity-50 transition-all duration-300"
                >
                    Previous
                </button>
                <span className="text-lg font-semibold text-gray-600">
                    Page {currentPage}/{totalPages}
                </span>
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="bg-gradient-to-r from-Primarycolor to-Primarycolor1 hover:from-Secondarycolor hover:to-Secondarycolor1 text-white font-semibold  py-2 px-4 rounded-br-full rounded-tr-full disabled:opacity-50 transition-all duration-300"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Blogcard;
