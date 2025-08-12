


import { Link } from "react-router-dom";
import { BiSolidPhoneCall } from "react-icons/bi";
import React from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai"

import { LOGO } from "./images"; // Adjust the import path as necessary
import { motion } from "framer-motion";

import { useState } from 'react'
export default function Navbar() {


    const [show, setShow] = useState(false)

    const handleShow = () => {
        setShow(show => !show)

    }

    const handleClose = () => {
        setShow(false)
    }


    const navLinks = [{ link: 'Home', to: "/" }, { link: 'About Us', to: "/about" }, { link: 'Services', to: "/services" },{ link: 'Portfolio', to: "/portfolio" },{ link: 'Blogs', to: "/blogs" }

    ]
    return (



        <div className=' z-50   px-6  bg-gradient-to-r from-bgcolor2 to-bgcolor2  w-full md:px-24'>

            <div className="  mx-auto flex  justify-between  w-full items-center   py-4  ">

                <div className='text-6xl '>
<Link to={"/"}>
                    <img src={LOGO} className=""
                        width={60}
                        height={60}
                        alt="image" />
</Link>
                </div>


                <div className=' hidden  md:flex  flex-col md:flex-row  justify-end'>
                    {navLinks.map((links, index) => {
                        return (


                            <Link to={links.to} className='text-white hover:text-amber1 px-3 font-medium  tracking-wider text-base ' key={index} >{links.link}</Link>


                        )
                    })}


                </div>
             

                <Link to={'/contact'} ><button className=" hidden md:flex  px-8 py-3 bg-gradient-to-r from-Primarycolor to-Primarycolor1 hover:from-Secondarycolor hover:to-Secondarycolor shadow-lg text-white font-semibold rounded-full transition-all duration-300">Contact Us</button></Link>

                {!show && < div className='  bg-greyBlack flex items-center   hover:text-white  text-light justify-center md:hidden'>< RxHamburgerMenu className="font-bold text-lg text-white transition duration-500 rounded-4xl w-7 h-7 " onClick={handleShow} /></div>}

                {show && < div className=' flex items-center    hover:text-white   justify-center md:hidden'><AiOutlineClose className="font-bold text-lg text-white transition duration-500  rounded-4xl w-7 h-7 " onClick={handleClose} /></div>}


            </div>

            {show && (
        <motion.div
          className='md:hidden flex flex-col pt-16 px-6 fixed top-0 left-0 w-64 bg-textcolor h-screen z-50 shadow-lg'
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          exit={{ x: "-100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {navLinks.map((links, index) => (
            <Link
              to={links.to}
              className='text-ash2 hover:text-amber2 py-3 font-medium tracking-wide text-base transition-all duration-200'
              key={index}
              onClick={handleClose}
            >
              {links.link}
            </Link>
          ))}

          <Link to="/contact"  className=" w-full   text-ash2 font-medium transition-all duration-300" onClick={handleClose}>
            
              Contact Us
           
          </Link>
        </motion.div>
      )}
           
        </div>

    )
}
