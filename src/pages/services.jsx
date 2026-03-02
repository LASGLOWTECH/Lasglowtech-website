import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "../utils/seo";
import Subscription from "../components/sections/subscription";
import TestimonialSection from "../components/sections/TestimonialSection";
import ServicesData from "../assets/data/serviceslist";
import useAOS from "../hooks/useAos";

const serviceTabs = ServicesData.map((service) => ({
  ...service,
  subtitle: service.title,
}));

export default function Services() {
  useAOS();
  const [active, setActive] = useState(0);

  return (
    <div className="min-h-screen bg-bgcolor text-textcolor2">
      <SEO
        title="Lasglowtech Services | Web, Mobile, Design, Tutoring & Service Catalogue"
        description="Lasglowtech offers web and mobile development, UI/UX and graphic design, professional IT tutoring and training, and a service catalogue with instant checkout. Choose a package or request a custom project."
        keywords="Lasglowtech services, web development, mobile apps, UI UX design, graphic design, IT tutoring Nigeria, tech training, service catalogue, instant checkout, buy services online"
        url="https://www.lasglowtech.com.ng/services"
        schema={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: serviceTabs.map((service, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: service.title,
            url: `https://www.lasglowtech.com.ng${service.link}`,
          })),
        }}
      />

      {/* Hero */}
      <section className="relative border-b border-Primarycolor/20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bgcolor2/60 to-bgcolor" />
        <div className="relative max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24 text-center">
          <p className="text-sm font-medium text-Secondarycolor uppercase tracking-widest mb-4" data-aos="fade-up">
            Services
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-textcolor2 tracking-tight" data-aos="zoom-up">
            Digital solutions for modern brands
          </h1>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto leading-relaxed" data-aos="fade-up">
            From web and mobile development to UI/UX and graphic design—we deliver solutions built to perform and scale. We also offer <strong className="text-gray-300">professional tutoring and training</strong>, and a <strong className="text-gray-300">service catalogue</strong> where you can select packages and <strong className="text-gray-300">checkout instantly</strong> online.
          </p>
          <nav
            className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-400"
            aria-label="Breadcrumb"
          >
            <Link to="/" className="hover:text-Secondarycolor transition-colors">
              Home
            </Link>
            <span aria-hidden>/</span>
            <span className="text-Secondarycolor">Services</span>
          </nav>
        </div>
      </section>

      {/* Service selector & detail */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-textcolor2 mb-3">
            Choose a service
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Select a category to view scope and features. Get started via custom consultation, or browse our <strong className="text-gray-300">service catalogue</strong> for fixed-price packages and <strong className="text-gray-300">instant checkout</strong>. We also run <strong className="text-gray-300">tutoring and training</strong> programmes—explore Careers to learn with us.
          </p>
        </div>

        {/* Service selector (vertical bars) + detail */}
        <section className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
          {/* Vertical bar buttons: horizontal on mobile, vertical on md+ */}
          <div className="flex md:flex-col justify-center items-center gap-2 md:gap-3">
            {serviceTabs.map((_, index) => (
              <button
                key={serviceTabs[index].link}
                onClick={() => setActive(index)}
                className={`transition-all duration-300 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-Secondarycolor focus-visible:ring-offset-2 focus-visible:ring-offset-bgcolor w-12 h-2 md:w-2 md:h-12 ${
                  active === index
                    ? "bg-Primarycolor shadow-md shadow-Primarycolor/40 md:h-14 scale-105 md:scale-100"
                    : "border border-Primarycolor/50 hover:bg-Primarycolor/25 hover:border-Primarycolor/70"
                }`}
                aria-label={`Switch to ${serviceTabs[index].title}`}
                aria-pressed={active === index}
              />
            ))}
          </div>

          {/* Active service detail */}
          <div className="flex-1 w-full rounded-2xl border border-Primarycolor/25 bg-bgcolor2/40 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.3 }}
                className="p-6 md:p-8 lg:p-10 flex flex-col justify-center order-2 lg:order-1"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-Secondarycolor mb-2">
                  {serviceTabs[active].subtitle}
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold text-textcolor2 mb-4">
                  {serviceTabs[active].title}
                </h2>
                <p className="text-gray-400 leading-relaxed mb-6">
                  {serviceTabs[active].description}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to={serviceTabs[active].link}
                    className="inline-flex items-center px-5 py-2.5 rounded-xl bg-Primarycolor/20 text-Secondarycolor font-medium text-sm hover:bg-Primarycolor/30 transition-colors"
                  >
                    Learn more
                  </Link>
                  <Link
                    to="/catalogues"
                    className="inline-flex items-center px-5 py-2.5 rounded-xl border border-Primarycolor/40 text-textcolor2 text-sm font-medium hover:bg-Primarycolor/20 transition-colors"
                  >
                    View catalogues & checkout
                  </Link>
                  <Link
                    to="/careers"
                    className="inline-flex items-center px-5 py-2.5 rounded-xl border border-Primarycolor/40 text-textcolor2 text-sm font-medium hover:bg-Primarycolor/20 transition-colors"
                  >
                    Tutoring & training
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[380px] order-1 lg:order-2">
              <AnimatePresence mode="wait">
                <motion.img
                  key={active}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  src={serviceTabs[active].Picture}
                  alt={serviceTabs[active].title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>
          </div>
          </div>
        </section>

        {/* Service cards grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {serviceTabs.map((service) => (
            <Link
              to={service.link}
              key={service.link}
              className="rounded-xl border border-Primarycolor/25 bg-bgcolor2/40 p-5 hover:border-Primarycolor/50 hover:shadow-lg hover:shadow-Primarycolor/10 transition-all duration-200"
            >
              <h3 className="text-lg font-semibold text-textcolor2">{service.title}</h3>
              <p className="text-sm text-gray-400 mt-2 line-clamp-3 leading-relaxed">{service.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <TestimonialSection />
      <Subscription />
    </div>
  );
}
