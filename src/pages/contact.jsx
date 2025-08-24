

import useAOS from '../hooks/useAos';
import FaqSection from '../components/Faq';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
// import Subscription from '../components/subscription';
import instance from '../config/axios.config';
import SEO from '../utils/seo';
import { Link } from 'react-router-dom';
import {  HeroImage} from  '../components/images/'

import { FaMapMarkerAlt, FaPhoneAlt, FaPaperPlane,  FaEnvelope, FaLinkedin, FaInstagram, FaFacebookF, FaTwitter  } from 'react-icons/fa';

const Contact = () => {
  const refreshAOS = useAOS(); // Initialize AOS on component mount

  // Initialize AOS on component mount  


  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);


    try {
      const res = await instance.post('/contacts', formData);
      toast.success('Message sent successfully!');

      setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' });
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="bg-white">

<SEO
       title="Contact Us | Lasglotech"
        description="Get in touch and Engage us in any of our services, by filling the online contact form"
        keywords="Contact us"
        url="https://www.lasglowtech.com.ng.com/Contact"
    
      />

       

      {/* Contact Section */}
      <div className="relative z-10 bg-gradient-to-r from-bgcolor2 to-bgcolor2  px-4 py-6 md:px-20">
<div
        className="inset-0 bg-cover bg-center opacity-5 absolute amimate-pulse min-h-screen  z-[-1] "
        style={{ backgroundImage: `url(${HeroImage})` }}
      >


      
      </div>


        {/* Header */}
      <section className="flex flex-col  items-center justify-center pt-12  pb-6  mx-auto shadow-sm">
        <h1 className="md:text-5xl text-4xl text-textcolor2  p-6 font-semibold" data-aos="fade-up">Contact Us</h1>


<div className="my-6  border border-gray-200 p-3 rounded-full text-textcolor2">
  <div className="text-base text-violet-600 cursor-pointer z">
    <span className="font-semibold"></span> <Link to="/" className="hover:underline">Home</Link>  / <Link to="/contact" className="hover:underline">Contact Us</Link>
  </div>
</div>
       

      </section>

      {/* Contact Info Cards */}
      
        <div className=" md:border md:border-Primarycolor shadow-lg rounded-xl p-4 md:p-10 grid  my-5md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="p-8 rounded-lg ">
            <h2 className="text-3xl text-Secondarycolor font-semibold mb-4">Get In Touch</h2>
            <p className="text-textcolor2 max-w-xl  text-normal mb-6">We’d love to hear from you! on any of our services, need support, or want to discuss a new project, our team is here to help.</p>

            <div className=" grid  grid-cols-1 md:grid-cols-3 py-6  items-center justify-center mx-auto space-y-4 text-sm">

              <div className="flex  items-start gap-3">

                < div className='flex items-center  rounded-md bg-textcolor justify-center p-3 gap-3'>
                  <FaEnvelope className="text-Primarycolor text-lg mt-1" />
                </div>

                <div>
                  <p className="font-semibold text-base text-textcolor2">Email</p>
                  <p className="text-textcolor2 text-small">lasglowtech@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">

                < div className='flex items-center  rounded-md bg-[#F6F5FA] justify-center p-3 gap-3'>
                  <FaPhoneAlt className="text-Primarycolor text-lg mt-1" />
                </div>

                <div>
                  <p className="text-textcolor2 text-small">Phone Number</p>
                  <p className="text-textcolor2 text-small">+234 903 182 1590</p>
                </div>
              </div>


              <div className="flex items-start gap-3">

                < div className='flex items-center  rounded-md bg-[#F6F5FA] justify-center p-3 gap-3'>
                  <FaMapMarkerAlt className="text-Primarycolor  text-lg mt-1" />
                </div>
                <div>
                  <p className="font-semibold  text-base text-textcolor2">Address</p>
                  <p className="text-textcolor2 text-small">Gwarinpa, FCT Abuja</p>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="mt-6">
              <p className="font-semibold text-textcolor2 mb-2">Follow us</p>
              <div className="flex gap-4 text-Secondarycolor text-xl">
               
               
                <a href="https://linkedin.com/in/austinosaz"><FaLinkedin className='' /></a>
                <a href="https://www.instagram.com/lasglowtech"><FaInstagram className='' /></a>
                <a href="https://m.facebook.com/omozemoje.augustineoisasoje"><FaFacebookF className='' /></a>
                <a href="https://twitter.com/OmozemojeAugus1"><FaTwitter className='' /></a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="firstName"
                type="text"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                className="p-3 bg-[#F6F5FA] focus:outline-none focus:ring-2   rounded-md"
                required
              />
              <input
                name="lastName"
                type="text"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                className="p-3 bg-[#F6F5FA] focus:outline-none focus:ring-2   rounded-md"
                required
              />
            </div>
            <input
              name="email"
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3  bg-[#F6F5FA] focus:outline-none focus:ring-2  rounded-md"
              required
            />
            <input
              name="subject"
              type="text"
              placeholder="Enter subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-3 bg-[#F6F5FA] focus:outline-none focus:ring-2  rounded-md"
              required
            />
            <textarea
              name="message"
              rows="4"
              placeholder="Type here your message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3  bg-[#F6F5FA] focus:outline-none focus:ring-2   rounded-md"
              required
            ></textarea>
            <button
              type="submit"
              className="text-white px-6 py-3  bg-gradient-to-r from-Primarycolor to-Primarycolor1 hover:from-Secondarycolor hover:to-Secondarycolor rounded-md duration-300"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
            {status && (
              <p className="mt-2 text-sm text-center text-green-600 font-medium">{status}</p>
            )}
          </form>
        </div>
      </div>



{/* <Subscription/> */}
      <FaqSection />


    </div>
  );
};

export default Contact;
