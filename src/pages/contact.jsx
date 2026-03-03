import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useAOS from "../hooks/useAos";
import FaqSection from "../components/Faq";
import instance from "../config/axios.config";
import SEO from "../utils/seo";
import { HeroImage } from "../components/images/";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaLinkedin,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa";

const SITE_URL = "https://www.lasglowtech.com.ng";

const CONTACT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Lasglowtech",
  description:
    "Get in touch with Lasglowtech for web development, mobile apps, UI/UX design, and IT services in Nigeria. Send a message or reach us by email, phone, or visit us in Abuja.",
  url: `${SITE_URL}/contact`,
  mainEntity: {
    "@type": "Organization",
    name: "Lasglowtech",
    url: SITE_URL,
    logo: `${SITE_URL}/LOGO.png`,
    contactPoint: {
      "@type": "ContactPoint",
      email: "lasglowtech@gmail.com",
      telephone: "+2349031821590",
      contactType: "customer service",
      areaServed: "NG",
      availableLanguage: "English",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Gwarinpa",
        addressRegion: "FCT",
        addressCountry: "NG",
      },
    },
    sameAs: [
      "https://www.instagram.com/lasglowtech",
      "https://linkedin.com/in/austinosaz",
      "https://twitter.com/OmozemojeAugus1",
      "https://m.facebook.com/omozemoje.augustineoisasoje",
    ],
  },
};

const Contact = () => {
  useAOS();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await instance.post("/contacts", formData);
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error(error.response.data?.error || "Invalid input. Please check and try again.");
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <SEO
        title="Contact Us | Lasglowtech – Get in Touch"
        description="Contact Lasglowtech for web development, mobile apps, UI/UX design, and IT services in Nigeria. Send a message, email lasglowtech@gmail.com, or call +234 903 182 1590. We're in Gwarinpa, Abuja."
        keywords="contact Lasglowtech, Lasglowtech Nigeria, web development Abuja, mobile app development contact, IT services Nigeria, digital agency contact, Lasglowtech email, Lasglowtech phone"
        url={`${SITE_URL}/contact`}
        schema={CONTACT_SCHEMA}
      />

      <main id="main-content" className="relative z-10">
        {/* Background image + texture overlay */}
        <div className="fixed inset-0 -z-[1] min-h-screen pointer-events-none" aria-hidden>
          <div
            className="absolute inset-0 bg-cover bg-center min-h-screen"
            style={{
              backgroundImage: `url(${HeroImage})`,
              opacity: 0.22,
            }}
          />
          <div
            className="absolute inset-0 min-h-screen mix-blend-overlay opacity-[0.08]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
            }}
          />
        </div>

        <div className="bg-gradient-to-r from-bgcolor2 to-bgcolor2 px-4 py-6 md:px-20">
          {/* Header & Breadcrumb */}
          <header className="flex flex-col items-center justify-center pt-12 pb-6 mx-auto">
            <h1 className="md:text-3xl text-2xl text-textcolor2 p-4 font-semibold text-center" data-aos="fade-up">
              Contact Us
            </h1>
            <p className="text-textcolor2/80 text-sm text-center max-w-xl mx-auto -mt-2 px-4">
              Have a project in mind or need support? We’d love to hear from you.
            </p>
            <nav aria-label="Breadcrumb" className="my-6 border border-gray-200 p-3 rounded-full text-textcolor2">
              <ol className="text-base text-violet-600 flex flex-wrap items-center justify-center gap-1">
                <li>
                  <Link to="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="font-semibold">
                  Contact Us
                </li>
              </ol>
            </nav>
          </header>

          {/* Contact content */}
          <section
            className="md:border md:border-Primarycolor shadow-lg rounded-xl p-4 md:p-10 grid my-5 md:grid-cols-2 gap-10 max-w-6xl mx-auto"
            aria-labelledby="get-in-touch-heading"
          >
            {/* Contact info */}
            <div className="p-4 md:p-6 rounded-lg">
              <h2 id="get-in-touch-heading" className="text-xl text-Secondarycolor font-semibold mb-4">
                Get In Touch
              </h2>
              <p className="text-textcolor2 text-sm max-w-xl mb-4">
                Whether you need support, want to discuss a new project, or have questions about our
                services—web development, mobile apps, UI/UX design, or IT training—our team in Abuja
                is here to help.
              </p>

              <ul className="grid grid-cols-1 py-6 space-y-4 text-sm list-none p-0 m-0" role="list">
                <li className="flex items-start gap-3">
                  <span className="flex items-center rounded-md bg-textcolor justify-center p-3 shrink-0" aria-hidden>
                    <FaEnvelope className="text-Primarycolor text-lg" />
                  </span>
                  <div>
                    <p className="font-semibold text-sm text-textcolor2">Email</p>
                    <a
                      href="mailto:lasglowtech@gmail.com"
                      className="text-textcolor2 hover:text-Secondarycolor hover:underline transition-colors"
                    >
                      lasglowtech@gmail.com
                    </a>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex items-center rounded-md bg-[#F6F5FA] justify-center p-3 shrink-0" aria-hidden>
                    <FaPhoneAlt className="text-Primarycolor text-lg" />
                  </span>
                  <div>
                    <p className="font-semibold text-sm text-textcolor2">Phone</p>
                    <a
                      href="tel:+2349031821590"
                      className="text-textcolor2 hover:text-Secondarycolor hover:underline transition-colors"
                    >
                      +234 903 182 1590
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex items-center rounded-md bg-[#F6F5FA] justify-center p-3 shrink-0" aria-hidden>
                    <FaMapMarkerAlt className="text-Primarycolor text-lg" />
                  </span>
                  <div>
                    <p className="font-semibold text-sm text-textcolor2">Address</p>
                    <p className="text-textcolor2">Gwarinpa, FCT Abuja, Nigeria</p>
                  </div>
                </li>
              </ul>

              <div className="mt-6">
                <p className="font-semibold text-textcolor2 mb-2">Follow us</p>
                <div className="flex gap-4 text-Secondarycolor text-xl" role="list">
                  <a
                    href="https://linkedin.com/in/austinosaz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                    aria-label="Lasglowtech on LinkedIn"
                  >
                    <FaLinkedin aria-hidden />
                  </a>
                  <a
                    href="https://www.instagram.com/lasglowtech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                    aria-label="Lasglowtech on Instagram"
                  >
                    <FaInstagram aria-hidden />
                  </a>
                  <a
                    href="https://m.facebook.com/omozemoje.augustineoisasoje"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                    aria-label="Lasglowtech on Facebook"
                  >
                    <FaFacebookF aria-hidden />
                  </a>
                  <a
                    href="https://twitter.com/OmozemojeAugus1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                    aria-label="Lasglowtech on Twitter"
                  >
                    <FaTwitter aria-hidden />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
              <h2 id="contact-form-heading" className="text-xl font-semibold text-textcolor2 mb-4 sr-only">
                Send us a message
              </h2>
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
                aria-labelledby="contact-form-heading"
                noValidate
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-firstname" className="sr-only">
                      First name
                    </label>
                    <input
                      id="contact-firstname"
                      name="firstName"
                      type="text"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full p-3 bg-[#F6F5FA] focus:outline-none focus:ring-2 focus:ring-Secondarycolor/50 focus:border-Secondarycolor/50 rounded-md border border-transparent text-gray-900 placeholder-gray-600"
                      required
                      autoComplete="given-name"
                      aria-required="true"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-lastname" className="sr-only">
                      Last name
                    </label>
                    <input
                      id="contact-lastname"
                      name="lastName"
                      type="text"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full p-3 bg-[#F6F5FA] focus:outline-none focus:ring-2 focus:ring-Secondarycolor/50 focus:border-Secondarycolor/50 rounded-md border border-transparent text-gray-900 placeholder-gray-600"
                      required
                      autoComplete="family-name"
                      aria-required="true"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 bg-[#F6F5FA] focus:outline-none focus:ring-2 focus:ring-Secondarycolor/50 focus:border-Secondarycolor/50 rounded-md border border-transparent text-gray-900 placeholder-gray-600"
                    required
                    autoComplete="email"
                    aria-required="true"
                  />
                </div>
                <div>
                  <label htmlFor="contact-subject" className="sr-only">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-3 bg-[#F6F5FA] focus:outline-none focus:ring-2 focus:ring-Secondarycolor/50 focus:border-Secondarycolor/50 rounded-md border border-transparent text-gray-900 placeholder-gray-600"
                    required
                    autoComplete="off"
                    aria-required="true"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="sr-only">
                    Your message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="Your message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-3 bg-[#F6F5FA] focus:outline-none focus:ring-2 focus:ring-Secondarycolor/50 focus:border-Secondarycolor/50 rounded-md border border-transparent text-gray-900 placeholder-gray-600 resize-y min-h-[100px]"
                    required
                    aria-required="true"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto text-white px-6 py-3 bg-gradient-to-r from-Primarycolor to-Primarycolor1 hover:from-Secondarycolor hover:to-Secondarycolor rounded-md duration-300 font-medium disabled:opacity-70 disabled:cursor-not-allowed transition-opacity"
                  disabled={loading}
                  aria-busy={loading}
                  aria-live="polite"
                >
                  {loading ? "Sending…" : "Send Message"}
                </button>
              </form>
            </div>
          </section>
        </div>

        <FaqSection />
      </main>
    </div>
  );
};

export default Contact;
