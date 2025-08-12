import React from "react";
// import {  HeroImage} from  '../components/images/'
import { Link } from "react-router-dom";
import { Slide2, Slide3, Gradient } from '../images';
import useAOS from "../../hooks/useAos";
const QuickContact = () => {
  const refreshAOS = useAOS();
  return (
    <section className=" bg-Primarycolor md:px-20 px-6 py-4 relative   overflow-hidden">

         <div
                        className="absolute amimate-pulse inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${Gradient})` }}
                    >
                        <div className="absolute inset-0 bg-bgcolor/80" />
                    </div>

                    <div className="flex items-center flex-col relative z-10 text-center py-20"
>
  
  
  {/* <div className="text-center   " data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl  text-textcolor2 font-medium mb-2">Why Choose Lasglowtech</h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          At Lasglowtech we don't  just build websites apps or sleek designs, but build  digital experiences that works and converts
        </p>
      </div> */}

      <div className="rounded-xl p-6 md:p-10 z-1 flex flex-col md:flex-row items-center justify-between gap-6">
      


        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-10  items-center">
          <div className="rounded-md border border-purple-600">
            {/* Placeholder for image/logo */}
            <img
              src={Slide2}
              alt="Avatar"
              className="w-full max-w-md md:max-w-2xl rounded-md  object-cover"
            />
          </div>
          <div className=" flex flex-col justify-center items-start" data-aos="fade-up">
                     <h2 className="text-2xl md:text-4xl font-semibold text-textcolor2 mb-2">Why Choose Lasglowtech?</h2>
                     <p className="text-base mb-2 text-gray-400  text-left font-medium tracking-tighr">At Lasglowtech we don't  just build web apps or sleek designs, but build  digital experiences that works and converts.
                      Looking for a Specific Service? We've got creative solutions tailored to your needs, take a glance at our list of services and contact us . </p>
                   <Link to="/services">
                       <button className="mt-4 px-5 py-3  bg-gradient-to-r from-Primarycolor to-Primarycolor1 hover:from-Secondarycolor hover:to-Secondarycolor shadow-lg text-white font-semibold rounded-full transition-all duration-300">
                      Learn More
                     </button>
                   </Link>
                 </div>
        </div>

        
      </div></div>      
    </section>
  );
};

export default QuickContact;
