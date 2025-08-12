import React from "react";
import { FaLightbulb, FaBullseye, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};
const coreValues = [
  {
    title: "Creativity",
    description:
      "At Lasglowtech, innovation is at the heart of everything we do. We blend design thinking with cutting-edge technology to craft unique digital experiences that elevate your brand.",
    icon: <FaLightbulb className="text-4xl text-primary" />,
  },
  {
    title: "Precision",
    description:
      "We don’t just build, we engineer. From pixel-perfect designs to clean, optimized code, we deliver solutions with accuracy, consistency, and attention to detail.",
    icon: <FaBullseye className="text-4xl text-primary" />,
  },
  {
    title: "Reliability",
    description:
      "We’re your dependable digital partner. With transparent processes, timely delivery, and ongoing support, we ensure your success every step of the way.",
    icon: <FaShieldAlt className="text-4xl text-primary" />,
  },
];


const CoreValues = () => {
  return (
    <section className="py-16 mt-16 px-4 sm:px-6 lg:px-20">
      <div className="mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-semibold text-textcolor mb-12"
        >
          Our Core Values
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {coreValues.map((value, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="hover:shadow-lg transition duration-300 rounded-xl p-8 text-left shadow-md shadow-Primarycolor2"
            >
              <div className="flex bg-Primarycolor items-center justify-center p-4 h-16 w-16 rounded-full">
                <span className="text-white">{value.icon}</span>
              </div>
              <h3 className="text-xl pt-8 font-semibold text-textcolor mb-2">
                {value.title}
              </h3>
              <p className="text-gray-400">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
