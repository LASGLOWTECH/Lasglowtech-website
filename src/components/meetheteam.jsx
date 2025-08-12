import React from "react";
import { motion } from "framer-motion";
import { Osaz,Chimex, James, Precious, Land2, Slide1 } from "./images";
const teamMembers = [
    {
        name: "Omozemoje A. Oisasoje",
        role: "Full Stack Developer/Founder",
        image: Osaz, // Replace with actual image path
    },
    {
        name: "Onuoha Chimezie",
        role: "Full-stack  Developer",
        image: Chimex,
    },
    {
        name: "Precious Emmanuel",
        role: "Web UI/UX Designer",
        image: Precious,
    },
    {
        name: "Solomon  James",
        role: "Video Editor/Photographer",
        image: James,
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.3,
            duration: 0.5,
            ease: "easeOut",
        },
    }),
};

const MeetTheTeam = () => {
    return (
        <section className="bg-gradient-to-r from-bgcolor2 to-bgcolor2 text-white py-16 ">

            <div className="pb-16 mx-auto ">
                <h2 className="text-3xl md:text-4xl font-bold text-center ">
                    Meet the Team
                </h2>

            <p className="   py-4 text-greyBlack mx-auto md:max-w-2xl text-gray-100 leading-tight text-base text-center">Meet the creative

                and innovative minds . Our team is dedicated to delivering exceptional results and pushing the boundaries of what's possible.
            </p>
                
            </div>
          
          
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {teamMembers.map((member, i) => (
                    <motion.div
                        key={i}
                        custom={i}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={cardVariants}
                        className="flex items-center md:flex-row flex-col justify-between gap-6  mt-3 relative"
                    >
                        {/* Profile Image */}
                        <div className="w-[300px] bg-[#d9d9d9] rounded-2xl overflow-hidden">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-full object-cover grayscale"
                            />
                        </div>

                        {/* Text Card */}
                        <div className="w-[300px] bg-bgcolor border flex  flex-col items-center justify-center border-Primarycolor md:mt-6 mt-[-50px] rounded-2xl p-6 relative">
                            <h3 className="text-xl font-semibold leading-tight">
                                {member.name}
                            </h3>

                            {/* Line connecting to the image */}
                            <div className="absolute top-1/2 md:left-[-30px] w-[30px] h-[1px]  hidden md:block" />

                            <div className="h-[1px] w-full bg-Primarycolor my-4" />

                            <button className="bg-Primarycolor text-sm px-4 py-2 rounded-full font-medium hover:bg-Secondarycolor transition-all">
                                {member.role.toUpperCase()}
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default MeetTheTeam;
