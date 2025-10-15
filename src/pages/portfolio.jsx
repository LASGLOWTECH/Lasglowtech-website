import React from "react";
import { motion } from 'framer-motion';
import SEO from "../utils/seo";
import useAOS from "../hooks/useAos";
import Subscription from "../components/sections/subscription";
import { Link } from 'react-router-dom';
import { Typewriter } from "react-simple-typewriter";
import { Gradient, Land1, Land2, Slide1, Graphic1, Graphic2, Web1, Mobile1,HeroImage } from "../components/images";
import PortfolioTabs from "../components/sections/portfoliotabs";
import CompanySlider from "../utils/slideshow";



export default function Portfolio() {
    const refreshAOS = useAOS();
    return (
        <div className="min-h-screen  py-6 bg-gradient-to-r from-bgcolor to-bgcolor2  px-4 sm:px-6">

            <SEO
                title="Lasglowtech | Portfolio"
                description="Care to know who we have worked for, here is our portfolio "
                keywords="Home, Lasglowtech digital services"
                url="https://www.lasglowtech.com.ng.com/portfolio"

            />


      <div className="relative z-10 bg-gradient-to-r  ">
<div
        className="inset-0 bg-cover bg-center opacity-20 md:opacity-5 absolute amimate-pulse min-h-screen  z-[-1] "
        style={{ backgroundImage: `url(${HeroImage})` }}
      >


      </div>
      </div>








            <div className=" relative z-10  overflow-hidden">
                <section className="flex flex-col  items-center justify-center py-16  mx-auto shadow-sm">
                    <h1 className="text-6xl text-textcolor2 pt-8 font-semibold" data-aos="zoom-up"> Portfolio</h1>


                    <div className="mt-8 border border-gray-200 p-3 rounded-full text-textcolor2">
                        <div className="text-base text-violet-600 cursor-pointer z">
                            <span className="font-semibold"></span> <Link to="/" className="hover:underline">Home</Link>  / <Link to="/portfolio" className="hover:underline">Portfolio</Link>
                        </div>
                    </div>


                </section>

 <section className="relative z-10 py-6 px-4 md:px-20">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="max-w-3xl mx-auto text-center"
                >
                    <h2 className="text-3xl  md:text-5xl  font-medium text-textcolor2 max-w-5xl leading-tight   mb-4 ">
                  Discover Who we have 
                        <span className="">
                            <Typewriter
                                words={[
                                    "  rendered Creative Services to ",
                                    " Worked For",

                                ]}
                                loop={true}
                                cursor={true}
                                cursorStyle="|"
                                typeSpeed={90}
                                deleteSpeed={40}
                                delaySpeed={1500}
                            />
                        </span>{" "}

                    </h2>

                    <p className="text-lg sm:text-lg md:text-xl text-textcolor2  mx-auto px-5 md:px-0  md:max-w-lg py-6 mb-8">
                      We’ve delivered results with style, precision, and a touch of sleek innovation.
                    </p>

                    <div>
                       
                    </div>
                </motion.div>
            </section>






            </div>
<CompanySlider/>

            {/* Hero Content */}
           
            <PortfolioTabs />

            <Subscription />
           
        </div>
    );
}