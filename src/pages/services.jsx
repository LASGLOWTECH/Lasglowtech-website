import { useState } from "react";
import SEO from "../utils/seo";
import { Gradient, Land1, Land2, Slide1, Graphic1, Graphic2, Web1, Mobile1, Contactimg } from "../components/images";
import Subscription from "../components/sections/subscription";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import useAOS from "../hooks/useAos";
import { FaCircle } from "react-icons/fa";
import TestimonialSection from "../components/sections/TestimonialSection";

const services = [
  {
    title: "Web Development Solutions",
    subtitle: "Web Development",
    description:
      "We build responsive, secure, and high-performance websites using the latest web technologies. From simple landing pages to complex platforms, our solutions are tailored to help your business grow online.",
    image: Web1,
  },
  {
    title: "Creative Graphic Design",
    subtitle: "Graphic Design",
    description:
      "Our design team delivers visually compelling graphics that communicate your brand identity effectively. From social media assets to complete branding kits, we help your business stand out with professional, modern design.",
    image: Graphic1,
  },
  {
    title: "Mobile App Development",
    subtitle: "Mobile Applications",
    description:
      "We design and develop custom mobile applications that offer seamless performance across devices. Whether you're launching an MVP or scaling an existing app, we provide user-focused solutions for Android and iOS.",
    image: Mobile1,
  },
  {
    title: "User-Centered Web Design",
    subtitle: "UI/UX Design",
    description:
      "We believe in doing more with less and doing it better. At Lasglowtech, we value smart automation that cuts the busywork and tools that help you scale without breaking the bank. Whether it's streamlining your workflow, speeding up project delivery, or helping your team stay focused on what really matters, we're all about efficient growth with zero compromise on quality. We create clean, intuitive, and user-friendly interfaces that enhance digital experiences. Our UI/UX design approach combines functionality with visual appeal to keep users engaged and satisfied.",
    image: Graphic2,
  },
  {
    title: "Maintenance & Optimization",
    subtitle: "Website Support & SEO",
    description:
      "Improve your website’s visibility and ranking on search engines with our expert SEO services, ongoing website updates, security monitoring, and technical support for peace of mind. From regular updates and security monitoring to performance tuning and SEO optimization, we offer ongoing support to keep your website secure, visible, and running at peak performance.",
    image: Graphic2,
  },
];

export default function Services() {
  const aos = useAOS()

  const [active, setActive] = useState(0);
  return (
    <div className=" min-h-screen  py-6 bg-gradient-to-r from-bgcolor to-bgcolor2"
    >



      <SEO
        title="Lasglowtech | Our Services"
        description="Are you aware of what our delivearables are?, this is where creative solutions are chanelled to your organization,
                                business or brand big all small, our solutions cut across "
        keywords="Home, Lasglowtech digital services"
        url="https://www.lasglowtech.com.ng.com/services"

      />

      <div
        className="absolute  inset-0 bg-cover min-h-screen    w-full   h-full   z-[-1] bg-center"
        style={{ backgroundImage: `url(${Contactimg})` }}
      >
        <div className="absolute bg-center bg-cover inset-0 bg-bgcolor/50" />
      </div>

      <div className=" relative z-10  overflow-hidden">

        <section className="flex flex-col  items-center justify-center py-16  mx-auto shadow-sm">
          <h1 className="text-6xl text-textcolor2 pt-8 font-semibold" data-aos="zoom-up"> Services</h1>


          <div className="mt-8 border border-gray-200 p-3 rounded-full text-textcolor2">
            <div className="text-base text-violet-600 cursor-pointer z">
              <span className="font-semibold"></span> <Link to="/" className="hover:underline">Home</Link>  / <Link to="/services" className="hover:underline">Services</Link>
            </div>
          </div>


        </section>



        <div className=" px-6  py-6 mx-auto ">
         
                    <h2 className="text-3xl  t md:text-5xl  font-medium text-textcolor2  text-center leading-tight   mb-6 ">Digital Solutions</h2>
          <p className="mx-auto text-gray-400  md: max-w-lg text-center mb-12">
            We offer a wide range of services to help your business succeed online. use ther buttons to navigate our variious services
          </p>


          <section className=" text-textcolor2 flex flex-col md:flex-row items-center justify-center px-4 md:px-20 py-12 gap-6">
            {/* Vertical/Horizontal Slim Buttons */}
            <div className="flex md:flex-col justify-center items-center ">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActive(index)}
                  className={`transition-all duration-300 ${active === index ? "bg-gradient-to-r from-Primarycolor to-Primarycolor" : "border border-Primarycolor"
                    } w-24 h-4 md:w-3 md:h-28 `}
                />
              ))}
            </div>

            {/* Content Panel */}
            <div className="flex flex-col-reverse md:flex-row items-center  justify-between flex-1 gap-8">
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
                  <p className="uppercase text-sm tracking-wider text-Secondarycolor font-semibold mb-4">
                    {services[active].subtitle}
                  </p>
                  <h2 className="text-3xl md:text-5xl tracking-tight font-medium mb-8">{services[active].title}</h2>
                  <p className="text-base text-gray-400 leading-relaxed">
                    {services[active].description}
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
                  className="md:w-1/2  w-full flex justify-center"
                >
                  <img
                    src={services[active].image}
                    alt={services[active].title}
                    className=" w-full h-full md:max-w-[600px] rounded-2xl shadow-Primarycolor shadow-md" data-aos='fadeup'
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </section>
       
        </div>

      </div>


<TestimonialSection/>




      <Subscription />
    </div>
  );
}