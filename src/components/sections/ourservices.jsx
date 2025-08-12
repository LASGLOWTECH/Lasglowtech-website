

import { FaCircle } from "react-icons/fa";
import Services from "../../assets/data/serviceslist";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

import useAOS from "../../hooks/useAos";






const OurServices = () => {
    useAOS();
    
    
    return(
    <section className="py-10 bg-bgcolor2" id="our-services">
     
          
            <section className=" px-6 flex items-center justify-center flex-col py-10 mb-12">
      <div className="flex mb-4 items-center justify-left flex-row ">
                         <FaCircle className="fill-Secondarycolor  h-3" />
                    <h3 className="text-2xl px-3 text-textcolor font-medium">Our Services</h3>
                    </div>
        <h2 className="text-3xl md:text-4xl text-center font-semibold mb-4 text-textcolor2" data-aos="fade-up">
        Transform Your Business  <br></br>with Expert Solutions
        </h2>
        <p className="mt-4 text-textcolor2 text-center md:max-w-sm leading-relaxed">
          Tailored customer support to boost satisfaction and drive growth.
        </p>
      </section>
            

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4  pt-5 gap-4 px-6 md:px-20">
        {Services.map((service, index) => (
    <Link to={`/services/${service.link.split("/").pop()}`} key={index}
  className="block bg-gradient-to-t from-bgcolor to-bgcolor2 hover:bg-white py-10 px-4 rounded-lg text-emibold shadow-md shadow-Primarycolor text-left transition-colors duration-300 group"
  data-aos="fade-in"
><h3 className="text-2xl  text-gray-300  group-hover:text-Secondarycolor font-semibold   mb-4">
              {service.title}
            </h3>

             <BsArrowUpRightCircleFill
                className="absolute bottom-2 right-2 fill-Secondarycolor group-hover:fill-textcolor z-10  rounded-full p-1 text-5xl shadow-lg cursor-pointer transition-all duration-300"
              />
            <p className="text-gray-400 text-base group-hover:text-textcolor mb-4 line-clamp-2">{service.description}</p>

            <div className="relative">
              <img
                src={service.Picture}
                alt="service"
                className="object-cover  w-full h-[250px]  pt-3 rounded-md"
              />
             
            </div>
            </Link>
        ))}
      </div>

 
    </section>
)};

export default OurServices;

