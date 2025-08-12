


import { useState } from 'react';
import { FaDiscord } from "react-icons/fa6";
 import { Link } from 'react-router-dom';

import { FaMapMarkerAlt, FaPhoneAlt,  FaEnvelope,  FaFacebookF, FaInstagram, FaDribbble, FaPinterest   } from 'react-icons/fa';

import { BsTwitter, BsLinkedin } from "react-icons/bs";
import {} from "react-icons/fa"

export default function Footer () {



  const today = new Date().getFullYear();
  const [newDay] = useState(today)



  return (
    <div className='bg-gradient-to-b from-textcolor to-slate-200 px-6 md:px-24 mx-auto to- py-12 '>

      <div className='grid md:grid-cols-3 justify-center gap-5 grid-cols-1'>


        {/* first grid */}
        <div className='contact  md:mt-0 mt-6 flex flex-col'>
          <h3 className='text-darkBlue font-bold text-lg '>Navigation</h3>

          <div className='flex-row my-4 '>
          <Link to= "/">  <p className='text-lg'>Home</p></Link>
          <Link to= "/About"><p className='text-lg'>About</p></Link>
          <Link to= "/services"> <p className='text-lg'>Services</p></Link>
          <Link to="/portfolio"><p className='text-lg'>Portfolio</p></Link>
          <Link to= "/contact"><p className='text-lg'>Contact</p></Link>
         
            
          </div>
        

        </div>


        {/* second grid */}



        <div className='contact md:mt-0 mt-12 flex flex-col'>

          
          
           
            <h3 className='text-darkBlue font-bold  text-lg'>Lasglowtech</h3>
           


          

          <p className='font-normal text-base pt-3 '> W firmly believe in the principle that any endeavor worth undertaking deserves to be executed with utmost dedication and precision.</p>



        </div>




        {/* last contact grid */}







        <div className='contact md:mt-0 mt-16 md:ml-4 flex flex-col'>
          <h3 className='text-darkBlue font-semibold  text-lg'>Contact</h3>





            <div className="space-y-4 text-sm">

              <div className="flex items-center justify-start gap-3">

                < div className='flex items-center  rounded-md bg-[#F6F5FA] justify-center p-3 gap-3'>
                  <FaEnvelope className="text-Primarycolor text-lg mt-1" />
                </div>

                
                  <p className="text-Primarycolor text-base">lasglowtech@gmail.com</p>
                
              </div>



              <div className="flex items-center justify-start gap-3">

                < div className='flex items-center  rounded-md bg-[#F6F5FA] justify-center p-3 gap-3'>
                  <FaPhoneAlt className="text-Primarycolor text-lg mt-1" />
                  
                </div>

                
                
                  <p className="text-Primarycololor text-base">+234 903 182 1590</p>
               
              </div>


              <div className="flex items-center gap-3">

                < div className='flex items-center  rounded-md bg-[#F6F5FA] justify-center p-3 gap-3'>
                  <FaMapMarkerAlt className="text-Primarycolor  text-lg mt-1" />
                </div>
              

                  <p className="text-Primarycolor text-base">Gwarinpa, FCT Abuja</p>
            
              </div>
            </div>



        </div>







      </div>



      {/* bottom links */}

      <div className='flex items-start  my-10 md:flex-row md:space-x-36 md:justify-center md:items-center flex-col '>

        <div className="flex flex-col md:justify-between row  justify-start  md:flex-row">
          <p className=" text-center md:text-left font-lighter text-base text-black py-2">  &copy; Copyright <span className="  text-black">{newDay} </span> Lasglowtech</p>

        </div>


        <div className='Email  flex  justify-start'>
          <span className=" rounded-[100%] my-5 mx-2 text-darkBlue  bg-orangeRed text-3xl"><a href="https://linkedin.com/in/austinosaz"><BsLinkedin className="p-1" /></a></span>

          <span className=" rounded-[100%]   my-5 me-2 text-darkBlue bg-orangeRed  text-3xl"><a href="https://twitter.com/OmozemojeAugus1" target="_blank"><BsTwitter className="p-1" /></a></span>
          <span className="rounded-[100%] my-5  mx-2  text-darkBlue  text-3xl"><a href="https://m.facebook.com/omozemoje.augustineoisasoje" target="_blank"><FaFacebookF className="p-1" /></a></span>
          <span className=" rounded-[100%] my-5 mx-2 text-darkBlue  bg-orangeRed text-3xl"><a href="https://www.instagram.com/lasglowtech"><FaInstagram className="p-1" /></a></span>
          <span className=" rounded-[100%] my-5 mx-2 text-darkBlue  bg-orangeRed text-3xl"><a href="https://dribbble.com/Austinosaz"><FaDribbble className="p-1" /></a></span>
          <span className=" rounded-[100%] my-5 mx-2 text-darkBlue  bg-orangeRed text-3xl"><a href="https://pin.it/6TdQiKnZP"><FaPinterest className="p-1" /></a></span>
          <span className=" rounded-[100%] my-5 mx-2 text-darkBlue  bg-orangeRed text-3xl"><a href="https://discord.com/channels/@lasglowtech"><FaDiscord  className="p-1" /></a></span>
 
        </div>



        




      </div>
    </div>
  )
}