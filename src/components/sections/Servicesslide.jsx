import { useState } from "react";
import Marquee from "react-fast-marquee";
import { FaCircle } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { pelifts,heroimage,fiftyreign,Fhemfelhomes,
Phoenixcover,ur9group,Smiggle1,Smiggle2,Smiggle3,Smiggle4,Sures1,Sures2 } from "../images";
import { Link } from "react-router-dom";
const images = [
    pelifts,heroimage,fiftyreign,Fhemfelhomes,
Phoenixcover,ur9group,Smiggle1,Smiggle2,Smiggle3,Smiggle4, Sures1,Sures2
];

const Servicesslide = () => {
      const [selectedImage, setSelectedImage] = useState(null);

    return (
        <div className="w-full py-16 bg-gradient-to-r md:px-20 from-bgcolor2 to-bgcolor2">

    <section className=" px-6 flex-1  justify-left flex-col py-10 mb-12">
      <div className="flex mb-4 items-center justify-left flex-row ">
                       
                     <FaCircle className="fill-Secondarycolor  h-3" />
                      <h3 className="text-2xl px-3 text-textcolor font-medium">Our Works</h3>
                    </div>
        <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-textcolor2" data-aos="fade-up">
   A Section of Our Projects
        </h2>
        
      </section>

         <div>
      <Marquee pauseOnHover={true} speed={40} gradient={false}>
        {images.map((src, idx) => (
          <div key={idx} className="mx-4 relative group cursor-pointer">
            <img
              src={src}
              alt={`Service ${idx + 1}`}
              className="rounded-lg shadow-lg w-[400px] h-[300px] object-cover"
              onClick={() => setSelectedImage(src)}
            />
            {/* Eye icon on hover */}
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
              <FaEye className="text-white text-3xl" />
            </div>
          </div>
        ))}
      </Marquee>
        {selectedImage && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <img
                src={selectedImage}
                alt="Selected Service"
                className="max-w-full max-h-full object-contain"
                onClick={() => setSelectedImage(null)}
            />
            </div>
        )}

      

    </div>

         <div className="py-8 flex items-center justify-center">
                   <Link
  to="/portfolio"
  className="px-8 py-3 border-4 border-Primarycolor1 hover:bg-Secondarycolor  text-white font-semibold rounded-full transition-all duration-300"
>
  View Portfolio
</Link>

                  </div>
    </div>
)};

export default Servicesslide;