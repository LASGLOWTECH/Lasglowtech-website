import React from 'react'
import Blogcard from '../components/blogcard';
import instance from '../config/axios.config';
import SEO from '../utils/seo';
import { motion } from "framer-motion";
import useAOS from '../hooks/useAos';
import Subscription from '../components/sections/subscription';
// import { posts } from "../components/blogdata";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Slide3, Line } from '../components/images';

const Blogs = () => {
  const refreshAOS=useAOS()

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
  return (
    <div className="overflow-hidden   py-6 bg-bgcolor2 bg-cover bg-center text-center"

    
      
      
      >
        
        <SEO
               title="Our blogs and latest news"
                description="Learn more about Pheonixstech our people, our purpose, and how innovation drives our world-class tech solutions."
                keywords="Our Blogs"
                url="https://www.lasglowtech.com.ng/blogs"
            
              />

 <section className="flex flex-col  items-center justify-center py-12 mx-auto shadow-sm">
                    <h1 className="text-6xl text-textcolor2 pt-8 font-semibold" data-aos="zoom-up"> Lasglow Blogs</h1>


                    <div className="mt-8 border border-gray-200 p-3 rounded-full text-textcolor2">
                        <div className="text-base text-violet-600 cursor-pointer z">
                            <span className="font-semibold"></span> <Link to="/" className="hover:underline">Home</Link>  / <Link to="/blogs" className="hover:underline">Blogs</Link>
                        </div>
                    </div>


                </section>




             

      <div className=" shadow-lg shadow-Primarycolor relative  rounded-full w-full h-[400px] md:h-[600px] lg:h-[600px]">
        <img
          src={Slide3}
          alt="Support team"
          className="w-full h-full object-cover object-center"
        />




        <div className="absolute inset-0 bg-gradient-to-b from-bgcolor/70 to-bgcolor2/40 flex flex-col justify-center items-centerrounded-full md:justify-center md:items-start text-white   px-6  md:px-20">





          <div className="bg-[#F5F7FA] text-Primarycolor text-xs font-semibold  px-2 py-1 rounded-md flex mb-4 items-center justify-left flex-row">
            <div className="rounded-full bg-gradient-to-r from-Primarycolor  to-Primarycolor1 w-[10px] h-[10px] mr-2"></div>
            <p className="text-sm text-Primarycolor ">Featured Posts</p>
          </div>
          <h3 className="text-3xl md:text-6xl leading-tight md:text-left drop-shadow-lg text-center font-semibold mb-2  md:max-w-2xl" >
           Tech News to Keep You Updated
          </h3>
          <p className="text-sm md:text-base lg:text-lg py-1  g md:text-left md:max-w-xl" >
           Read and stay updated on the latest news, resources, guides, and announcements from Lasglowtech
          </p>



 <Link
              to={
                posts.length > 0 && posts[0].slug
                  ? `/blog/${posts[1].slug}`
                  : "#"
              }
              onClick={(e) => {
                if (posts.length === 0) e.preventDefault();
              }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="bg-gradient-to-r from-Primarycolor to-Primarycolor1 hover:from-Secondarycolor hover:to-Secondarycolor shadow-md text-white font-semibold py-3 px-5  mt-3 rounded-full transition-all duration-300"
            >
              
                View Blog
              </motion.button>
            </Link>




        </div>
      </div>

      <Blogcard />
<Subscription />
    

    </div>
  )
}

export default Blogs;
