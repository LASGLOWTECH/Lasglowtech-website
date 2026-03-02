import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaCircle } from "react-icons/fa";
import { Land1 , Land2, Slide1}  from "./images";

import useAOS from "../hooks/useAos";
const panels = [
  {
    title: "Designing the Future of Digital",
    subtitle: "Our Vision",
    description:
      "At Lasglowtech, our vision is to shape the digital future by crafting smart, creative, and scalable solutions. We aim to be a trusted partner for brands seeking growth through standout websites, intuitive apps, and compelling visuals. By blending strategy with innovation, we help businesses unlock their potential and lead in a digital-first world.",
    image: Land1, // Replace with actual image path
  },
  {
    title: "Turning Ideas into Impact",
    subtitle: "Our Mission",
    description:
      "Our mission is to deliver high-quality digital services that transform ideas into powerful user experiences. From web and app development to branding and graphic design, we combine creativity, technology, and strategy to help businesses stand out and succeed. We focus on solutions that are built to perform, built to grow, and built for you.",
    image: Slide1,
  },
  {
    title: "Creativity. Precision. Reliability.",
    subtitle: "Our Values",
    description:
      "We believe in the power of purposeful design and smart execution. At Lasglowtech, we value creativity that solves problems, precision in every detail, and reliability in delivery. Whether we’re designing a logo, building a platform, or launching a brand online, our values guide us to do meaningful work — with integrity, passion, and excellence.",
    image: Land2,
  },
];


export default function VerticalTabs() {
const refreshAOS = useAOS();
  const [active, setActive] = useState(0);

  return (
    <div className="min-h-screen bg-[#120b1f]">
 <div className=" mx-auto mt-16 flex px-2 py-6 items-center justify-center  shadow-lg w-[300px] rounded-[10px]"  >

          <FaCircle className="fill-Secondarycolor  h-3" />
          <h3 className="text-2xl px-3 text-textcolor2 font-medium">About Us</h3>
       
        </div>
           
             {/* <div className="flex mb-4  mx-auto items-center justify-center  flex-row ">
          <div className="rounded-full  bg-gradient-to-r from-Secondarycolor to-Secondarycolor1 w-[10px] h-[10px] mr-2"></div>
          <p className="uppercase  text-centertext-sm tracking-tight text-textcolor ">  </p>
        </div> */}
          
      
    <section className=" text-textcolor2 flex flex-col md:flex-row items-center justify-center px-4 md:px-20 py-12 gap-6">
      {/* Vertical/Horizontal Slim Buttons */}
      <div className="flex md:flex-col justify-center items-center ">
        {panels.map((_, index) => (
          <button
            key={index}
            onClick={() => setActive(index)}
            className={`transition-all duration-300 ${

              active === index ? "bg-gradient-to-r from-Primarycolor to-Primarycolor" : "border border-Primarycolor"
            } w-28 h-3 md:w-3 md:h-28 `}
          />
        ))}
      </div>

      {/* Content Panel */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between flex-1 gap-8">
        {/* Left Text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active + "_left"}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="md:w-1/2"
          >
            <p className="uppercase text-sm tracking-wider text-textcolor2 font-semibold mb-4">
              {panels[active].subtitle}
            </p>
            <h2 className="text-2xl md:text-4xl font-bold mb-8">{panels[active].title}</h2>
            <p className="text-base text-textcolor2 leading-relaxed">
              {panels[active].description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Right Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active + "_img"}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4 }}
            className="md:w-1/2 flex justify-center"
          >
            <img
              src={panels[active].image}
              alt={panels[active].title}
              className=" w-full md:max-w-[600px] rounded-2xl shadow-Primarycolor shadow-md" data-aos='fadeup'
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
    </div>
  );
}
