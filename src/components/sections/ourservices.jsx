

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
        Strategy, Design, and Engineering <br></br>Built for Results
        </h2>
        <p className="mt-4 text-textcolor2 text-center md:max-w-xl leading-relaxed">
          From concept to launch, we deliver practical digital services that strengthen your brand and accelerate growth. We also offer <strong className="text-textcolor2">tutoring and tech training</strong>, and a <strong className="text-textcolor2">service catalogue</strong> with <strong className="text-textcolor2">instant checkout</strong> so you can buy packages online.
        </p>
      </section>
            

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4  pt-5 gap-4 px-6 md:px-20">
        {Services.map((service, index) => (
    <Link to={`/services/${service.link.split("/").pop()}`} key={index}
  className="block bg-gradient-to-t from-bgcolor to-bgcolor2 border border-Primarycolor/20 py-8 px-4 rounded-lg shadow-md shadow-Primarycolor/30 text-left transition-all duration-300 group hover:-translate-y-1 hover:border-Primarycolor/50"
  data-aos="fade-in"
><h3 className="text-2xl  text-textcolor2  group-hover:text-Secondarycolor font-semibold   mb-4">
              {service.title}
            </h3>

             <BsArrowUpRightCircleFill
                className="absolute bottom-2 right-2 fill-Secondarycolor group-hover:fill-textcolor z-10  rounded-full p-1 text-5xl shadow-lg cursor-pointer transition-all duration-300"
              />
            <p className="text-muted text-sm group-hover:text-textcolor mb-4 line-clamp-3">{service.description}</p>

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

