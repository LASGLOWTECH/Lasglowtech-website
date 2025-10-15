import React from "react";
import { Link } from "react-router-dom";
import { FaCircle } from "react-icons/fa";

import { CEO, Gradient, Contactimg, Aboutimg } from "../components/images";
import Subscription from "../components/sections/subscription";
import MeetTheTeam from "../components/meetheteam";
import CoreValues from "../components/sections/corevalues";
import FaqSection from "../components/Faq";

import SEO from "../utils/seo";
import useAOS from "../hooks/useAos";

const About = () => {
  const refreshAOS = useAOS();

  return (
    <div className="relative bg-gradient-to-r from-bgcolor2 to-bgcolor2 px-6 md:px-20 mx-auto py-6">
      {/* SEO Meta Tags */}
      <SEO
        title="About Us | Lasglowtech"
        description="Learn more about Lasglowtech people, our purpose, and how innovation drives our world-class tech solutions."
        keywords="About Lasglowtech"
        url="https://www.lasglowtech.com.ng/About"
      />

      {/* Background Image */}
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center z-[-1]"
        style={{ backgroundImage: `url(${Contactimg})` }}
      >
        <div className="absolute inset-0 bg-bgcolor/50" />
      </div>

      {/* Header Section */}
      <div className="relative z-10">
        <section className="flex flex-col items-center justify-center py-16 mx-auto text-center">
          <h1
            className="text-3xl sm:text-3xl md:text-5xl text-textcolor2 py-4 font-semibold"
            data-aos="zoom-up"
          >
            About Us
          </h1>

          {/* Breadcrumb */}
          <div className="mt-5 border border-gray-200 p-3 rounded-full text-textcolor2">
            <p className="text-base text-violet-600 cursor-pointer">
              <Link to="/" className="hover:underline">
                Home
              </Link>{" "}
              /{" "}
              <Link to="/about" className="hover:underline">
                About
              </Link>
            </p>
          </div>
        </section>

        {/* Main Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 justify-center items-center">
          {/* Image Section */}
          <div className="w-full" data-aos="zoom-in">
            <img
              src={Aboutimg}
              alt="About Lasglowtech"
              className="w-full h-auto md:h-full md:max-w-[550px] rounded-[5%] shadow-primarycolor shadow-md"
            />
          </div>

          {/* Text Content */}
          <div
            className="flex flex-col justify-center items-center md:items-start text-center md:text-left"
            data-aos="slide-up"
          >
            <div className="flex items-center gap-2 text-sm text-orange-500 font-medium my-3">
              <FaCircle className="text-[6px]" />
              <span>About Us</span>
            </div>

            <h2 className="text-2xl md:text-4xl font-semibold text-textcolor2 leading-tight mb-4">
              The Vision of Lasglowtech
            </h2>

            <p className="text-base text-gray-400 leading-relaxed">
              Lasglowtech was founded on a vision conceived in 2020 and officially launched in 2021.
              The name reflects our commitment to delivering innovative digital solutions that cater
              to a wide range of industries. Our evolution stems from a desire to make a lasting
              impact in the tech space — combining creativity, functionality, and strategy to solve
              real-world problems.
              <br />
              <br />
              At Lasglowtech, we specialize in web development, web design, app development,
              graphic design, and other creative tech services that empower businesses to thrive in
              a digital-first world. Our passionate, results-driven team works collaboratively to
              turn ideas into practical, high-performing solutions.
              <br />
              <br />
              Whether you're a startup looking to establish a digital presence or an established
              brand seeking to evolve, Lasglowtech is your trusted partner for innovation,
              visibility, and growth — all in one place.
            </p>
          </div>
        </div>
      </div>

      {/* Additional Sections */}
      <CoreValues />
      <MeetTheTeam />
      <Subscription />
      <FaqSection />
    </div>
  );
};

export default About;
