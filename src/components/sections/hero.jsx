// import React from 'react';
// import { motion } from 'framer-motion';
// import { HeroImage } from '../images';
// import { Link } from 'react-router-dom';
// import { Typewriter } from "react-simple-typewriter";
// const Hero = () => {
//   return (
//     <div className="relative w-full h-full bg-gradient-to-r from-bgcolor2 to-bgcolor2 md:py-16">
      
//       {/* Background Image (semi-transparent over gradient) */}
//       <div
//         className="absolute inset-0 bg-cover bg-center opacity-20 z-0"
//         style={{ backgroundImage: `url(${HeroImage})` }}
//       ></div>

//       {/* Hero Content */}
//       <section className="relative z-10   md:px-20">
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//           className="max-w-4xl mx-auto text-center"
//         >
//           <h1 className="text-[40px] font-bold  px-2 pt-24 md:pt-0 md:text-[70px] md:font-semibold text-textcolor2 max-w-5xl leading-[40px] md:leading-[70px] md:mt-10 mb-6">
//             We Enhance Your Business with our  <br></br>
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-Secondarycolor to-Secondarycolor">
//               <Typewriter
//             words={[
//               "Creative Solutions ",
//               "Digital Solutions",

//             ]}
//             loop={true}
//             cursor={true}
//             cursorStyle="|"
//             typeSpeed={90}
//             deleteSpeed={40}
//             delaySpeed={1500}
//           />
//             </span>{" "}
          
//           </h1>

//           <p className="text-lg sm:text-lg md:text-xl text-textcolor2  mx-auto px-5 md:px-0 max-w-2xl md:max-w-sm py-6 mb-8">
//             Purpose-driven digital experiences tailored to your brand.
//           </p>

//           <div>
//             <Link
//               to="/contact"
//               className="inline-block px-8 py-3 bg-gradient-to-r from-Primarycolor to-Primarycolor1 hover:from-Secondarycolor hover:to-Secondarycolor shadow-lg text-white font-semibold rounded-full transition-all duration-300"
//             >
//               Learn More
//             </Link>
//           </div>
//         </motion.div>
//       </section>
//     </div>
//   );
// };

// export default Hero;
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HeroImage } from '../images';

import { Typewriter } from "react-simple-typewriter";

// Floating shape component
function FloatingShape({ color, position, scale = 1 }) {
  const ref = useRef();
  useFrame(({ clock, mouse }) => {
    ref.current.rotation.x = clock.getElapsedTime() / 2;
    ref.current.rotation.y = clock.getElapsedTime() / 2;
    ref.current.position.x = position[0] + mouse.x * 0.5;
    ref.current.position.y = position[1] - mouse.y * 0.5;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={color}
        flatShading
        emissive={color}
        emissiveIntensity={0.4}
      />
    </mesh>
  );
}

export default function Hero() {
  return (
    <div className="relative w-full h-full bg-gradient-to-r from-bgcolor2 to-bgcolor2 md:py-16">
      {/* 3D Background */}
      <Canvas
        className="absolute inset-0 z-0 pt-6"
        camera={{ position: [0, 0, 3.2], fov: 50 }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <FloatingShape color="#31185e" position={[-2, 1, -5]}  scale={2} />
        <FloatingShape color="#ed6e00" position={[0, 0, -5]} className="floating-shape" scale={2} />
        <FloatingShape color="#31185e" position={[2, -1, -5]} className="floating-shape" scale={2} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 z-0"
        style={{ backgroundImage: `url(${HeroImage})` }}
      ></div>

      {/* Hero Content */}
      <section className="relative z-10 md:px-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-[40px] font-bold px-2 pt-0 md:pt-0 md:text-[70px] md:font-semibold text-textcolor2 leading-[40px] md:leading-[70px] mb-6">
            We Enhance Your Business with our <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-Secondarycolor to-Secondarycolor">
              <Typewriter
                words={["Creative Solutions", "Digital Solutions"]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={90}
                deleteSpeed={40}
                delaySpeed={1500}
              />
            </span>
          </h1>

          <p className="text-lg md:text-xl text-textcolor2 px-4 md:px-0max-w-2xl mx-auto py-6 mb-8">
            Purpose-driven digital experiences tailored to your brand.
          </p>

          <Link
            to="/contact"
            className="inline-block px-8 py-3 bg-gradient-to-r from-Primarycolor to-Primarycolor1 hover:from-Secondarycolor hover:to-Secondarycolor shadow-lg text-white font-semibold rounded-full transition-all duration-300"
          >
            Learn More
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
