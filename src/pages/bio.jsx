import React from "react";
import {
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaDribbble,
  FaPinterest,
  FaGlobe,
  FaTelegram,
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaGithub,
  FaBehance
} from "react-icons/fa";


import { motion } from "framer-motion";

import { LOGO } from '../components/images';
export default function LinksPage() {
  const links = [
    {
      label: "Lasglowtech Website",
      icon: <FaGlobe className="text-emerald-400 text-2xl" />,
      url: "https://lasglowtech.com.ng",
      color: "bg-emerald-500/10 hover:bg-Primarycolor1",
    },


    {
      label: "My Portfolio",
      icon: <FaGlobe className="text-emerald-500 text-2xl" />,
      url: "https://austinosaz.vercel.app/",
      color: "bg-emerald-500/10 hover:bg-emerald-500/20",
    },

     {
      label: "LinkedIn",
      icon: <FaLinkedin className="text-blue-700 text-2xl" />,
      url: "https://linkedin.com/in/austinosaz",
      color: "bg-blue-700/10 hover:bg-blue-700/20",
    },

     {
      label: "Instagram",
      icon: <FaInstagram className="text-pink-500 text-2xl" />,
      url: "https://instagram.com/lasglowtech",
      color: "bg-pink-500/10 hover:bg-pink-500/20",
    },

    {
      label: "Facebook",
      icon: <FaFacebook className="text-blue-600 text-2xl" />,
      url: "https://m.facebook.com/omozemoje.augustineoisasoje",
      color: "bg-blue-600/10 hover:bg-blue-600/20",
    },
   
    {
      label: "YouTube",
      icon: <FaYoutube className="text-red-600 text-2xl" />,
      url: "https://www.youtube.com/@Austinosaz",
      color: "bg-red-600/10 hover:bg-red-600/20",
    },
   
    {
      label: "Dribbble",
      icon: <FaDribbble className="text-pink-400 text-2xl" />,
      url: "https://dribbble.com/Austinosaz",
      color: "bg-pink-400/10 hover:bg-pink-400/20",
    },

     {
      label: "Behance",
      icon: <FaBehance className="text-blue-600 text-2xl" />,
      url: "https://www.behance.net/omozemoaugusti",
      color: "bg-pink-400/10 hover:bg-pink-400/20",
    },
    {
      label: "Pinterest",
      icon: <FaPinterest className="text-red-700 text-2xl" />,
      url: "https://pinterest.com/lasglowtech",
      color: "bg-red-700/10 hover:bg-red-700/20",
    },
    
      {
      label: "Twitter (X)",
      icon: <FaTwitter className="text-sky-500 text-2xl" />,
      url: "https://x.com/OmozemojeAugus1",
      color: "bg-sky-500/10 hover:bg-sky-500/20",
    },
    {
      label: "Telegram",
      icon: <FaTelegram className="text-sky-500 text-2xl" />,
      url: "https://t.me/+B8_D8-x_Dng3NTZk",
      color: "bg-sky-500/10 hover:bg-sky-500/20",
    },
    {
      label: "Chat Up",
      icon: <FaWhatsapp className="text-green-500 text-2xl" />,
      // update number with your full phone in international format (no +), e.g. 2348012345678
      url: "https://wa.me/2349031821590",
      color: "bg-green-500/10 hover:bg-green-500/20",
    },

  
    {
      label: "GitHub",
      icon: <FaGithub className="text-gray-400 text-2xl" />,
      url: "https://github.com/LASGLOWTECH",
      color: "bg-gray-700/10 hover:bg-gray-700/20",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-bgcolor2 to-bgcolor2 text-white p-6">
      <div className="max-w-sm w-full text-center">
        {/* Logo */}
        <img
          src={LOGO}
          alt="Lasglowtech Logo"
          className="w-24 h-24 mx-auto mb-4 rounded-full shadow-lg shadow-Primarycolor1"
        />

        <h1 className="text-2xl font-semibold mb-2">Lasglowtech Digital Services</h1>
        <p className="text-gray-400 mb-6">Graphic Design | Web Design |Web Development | Branding | Tutor</p>

        <div className="space-y-3">
          {links.map((link, idx) => (
            <motion.a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className={`flex items-center gap-3 ${link.color} border border-gray-700 py-3 px-4 rounded-xl transition-all duration-200 hover:scale-105`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * idx }}
            >
              {link.icon}
              <span className="font-medium">{link.label}</span>
            </motion.a>
          ))}
        </div>

        <footer className="mt-8 text-gray-500 text-sm">© {new Date().getFullYear()} Lasglowtech Digital Services</footer>
      </div>
    </div>
  );
}
