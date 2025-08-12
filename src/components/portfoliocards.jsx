import React from 'react';
import { motion } from 'framer-motion';

const PortfolioCard = ({ image, alt, description, link, delay = 0 }) => {
  return (
    <motion.div
      className="rounded-xl  w-100  overflow-hidden shadow-lg border border-Primarycolor bg-white dark:bg-bgcolor text-black dark:text-textcolor2"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
    >
      <img src={image} alt={alt} className="w-full h-[400px] object-cover" />

      <div className="p-4">
        <p className="text-sm mb-3">{description}</p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 text-sm font-medium bg-Primarycolor  text-textcolor2 rounded-md hover:bg-Secondarycolor transition"
        >
          View Project
        </a>
      </div>
    </motion.div>
  );
};

export default PortfolioCard;