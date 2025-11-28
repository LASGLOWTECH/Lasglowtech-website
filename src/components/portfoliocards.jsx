import React from "react";
import { motion } from "framer-motion";

const PortfolioCard = ({ image, alt, title, description, price, link, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className="
        rounded-2xl overflow-hidden 
        border border-Primarycolor 
        bg-bgcolor
         dark:bg-bgcolor
        text-black dark:text-textcolor2 
        shadow-md hover:shadow-xl 
        transition-shadow duration-300
      "
    >
      {/* Thumbnail */}
      <div className="w-full">
        <img
          src={image}
          alt={alt}
          className="w-full h-[260px] md:h-[340px] object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {title && (
          <h3 className="text-lg font-semibold text-gray-800 dark:text-textcolor2">
            {title}
          </h3>
        )}

        {description && (
          <p className="text-sm text-gray-600 dark:text-textcolor2">
            {description}
          </p>
        )}

        {/* Price Section */}
        {price && (
          <p className="text-md font-bold text-Primarycolor">{price}</p>
        )}

        {/* Button */}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-block w-full text-center 
        py-2 rounded-md 
            font-medium text-sm
            bg-Primarycolor hover:bg-Secondarycolor 
            text-textcolor2 
            transition-all
          "
        >
          View Demo
        </a>
      </div>
    </motion.div>
  );
};

export default PortfolioCard;
