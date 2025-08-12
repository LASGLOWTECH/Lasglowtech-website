import React from 'react';
import { motion } from 'framer-motion';
import { HeroImage } from '../images';
import { Link } from 'react-router-dom';
import { Typewriter } from "react-simple-typewriter";
const Hero = () => {
  return (
    <div className="relative w-full h-full bg-gradient-to-r from-bgcolor2 to-bgcolor2 md:py-16">
      
      {/* Background Image (semi-transparent over gradient) */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 z-0"
        style={{ backgroundImage: `url(${HeroImage})` }}
      ></div>

      {/* Hero Content */}
      <section className="relative z-10   md:px-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-[40px] font-bold  px-2 pt-24 md:pt-0 md:text-[70px] md:font-semibold text-textcolor2 max-w-5xl leading-[40px] md:leading-[70px] md:mt-10 mb-6">
            We Enhance Your Business with our  <br></br>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-Secondarycolor to-Secondarycolor">
              <Typewriter
            words={[
              "Creative Solutions ",
              "Digital Solutions",

            ]}
            loop={true}
            cursor={true}
            cursorStyle="|"
            typeSpeed={90}
            deleteSpeed={40}
            delaySpeed={1500}
          />
            </span>{" "}
          
          </h1>

          <p className="text-lg sm:text-lg md:text-xl text-textcolor2  mx-auto px-5 md:px-0 max-w-2xl md:max-w-sm py-6 mb-8">
            Purpose-driven digital experiences tailored to your brand.
          </p>

          <div>
            <Link
              to="/contact"
              className="inline-block px-8 py-3 bg-gradient-to-r from-Primarycolor to-Primarycolor1 hover:from-Secondarycolor hover:to-Secondarycolor shadow-lg text-white font-semibold rounded-full transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Hero;
