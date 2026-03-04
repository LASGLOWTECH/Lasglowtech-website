import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaCode, FaLightbulb, FaRocket } from "react-icons/fa";
import CompanySlider from "../utils/slideshow";
import Hero from "../components/sections/hero";
import OurServices from "../components/sections/ourservices";
import VerticalTabs from "../components/verticaltabs";
import Servicesslide from "../components/sections/Servicesslide";
import StatsSection from "../components/sections/BusinessSection";
import QuickContact from "../components/sections/Quickcontact";
import Subscription from "../components/sections/subscription";
import SEO from "../utils/seo";
import CataloguePreview from "../components/sections/CataloguePreview";

const corePillars = [
  {
    title: "Product Strategy",
    text: "Clear discovery, scope definition, and execution roadmap aligned to business goals.",
    icon: FaLightbulb,
  },
  {
    title: "Design & Experience",
    text: "Modern visual systems and user journeys built for trust, usability, and conversion.",
    icon: FaCheckCircle,
  },
  {
    title: "Engineering Delivery",
    text: "Scalable frontend/backend implementation with performance and quality assurance.",
    icon: FaCode,
  },
  {
    title: "Launch & Growth",
    text: "Post-launch support, optimization, and continuous improvements for measurable impact.",
    icon: FaRocket,
  },
];

const processFlow = [
  {
    step: "01",
    title: "Discovery Session",
    text: "We map your goals, audience, and product priorities to define a practical plan.",
  },
  {
    step: "02",
    title: "Design & Build",
    text: "Our team designs and implements digital assets with quality checks at every stage.",
  },
  {
    step: "03",
    title: "Deploy & Support",
    text: "We launch, monitor, and optimize with ongoing support based on data and feedback.",
  },
];

const Home = () => {
  return (
    <div className="bg-bgcolor text-textcolor2">
      <SEO
        title="Lasglowtech | Web Development, Tutoring, Service Catalogue & Instant Checkout Nigeria"
        description="Lasglowtech delivers web and mobile development, UI/UX design, professional IT tutoring and training, and a service catalogue with instant checkout. Buy digital service packages online or get custom projects—Nigeria's growth-focused digital partner."
        keywords="Lasglowtech, web development Nigeria, mobile app development, UI UX design, IT tutoring, tech training Nigeria, service catalogue, instant checkout, buy services online, digital agency Nigeria"
        url="https://www.lasglowtech.com.ng"
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Lasglowtech",
            url: "https://www.lasglowtech.com.ng",
            logo: "https://www.lasglowtech.com.ng/LOGO.png",
            description: "Digital services, IT tutoring, and service catalogue with instant checkout for web, mobile, and design.",
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Lasglowtech",
            url: "https://www.lasglowtech.com.ng",
            potentialAction: {
              "@type": "SearchAction",
              target: { "@type": "EntryPoint", urlTemplate: "https://www.lasglowtech.com.ng/catalogues?q={search_term_string}" },
              "query-input": "required name=search_term_string",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            name: "Lasglowtech",
            url: "https://www.lasglowtech.com.ng",
            description: "Professional IT tutoring and tech training programmes.",
          },
        ]}
      />
      <Hero />
      <CompanySlider />
      <VerticalTabs />
      <OurServices />

      {/* Why Lasglowtech */}
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-Secondarycolor">
              Why Lasglowtech
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-textcolor2 mt-3 leading-tight">
              Built for brands that want results
            </h2>
            <p className="text-gray-400 text-sm mt-3 leading-relaxed">
              We combine product thinking, design excellence, and technical depth to help businesses launch and
              scale with confidence. We also provide <strong className="text-gray-300">tutoring and tech training</strong> </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {corePillars.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-xl border border-Primarycolor/25 bg-bgcolor2/50 p-4 md:p-5 hover:border-Primarycolor/40 hover:shadow-md hover:shadow-Primarycolor/5 transition-all duration-200 flex flex-col"
                >
                  <span className="w-10 h-10 rounded-lg border border-Primarycolor/40 bg-Primarycolor/20 text-Secondarycolor flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </span>
                  <h3 className="text-base font-semibold text-textcolor2 mt-4">{item.title}</h3>
                  <p className="text-gray-400 mt-1.5 text-sm leading-relaxed flex-1">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* How We Deliver */}
      <section className="px-6 md:px-12 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-xl border border-Primarycolor/25 bg-bgcolor2/50 overflow-hidden">
            <div className="px-5 md:px-8 py-6 border-b border-Primarycolor/20">
              <p className="text-xs font-semibold uppercase tracking-widest text-Secondarycolor">
                Execution model
              </p>
              <h2 className="text-xl md:text-2xl font-bold text-textcolor2 mt-2">
                How we deliver
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {processFlow.map((item, index) => (
                <article
                  key={item.step}
                  className={`p-4 md:p-6 ${
                    index < processFlow.length - 1 ? "md:border-r border-Primarycolor/20" : ""
                  }`}
                >
                  <p className="text-Secondarycolor text-xl font-bold">{item.step}</p>
                  <h3 className="text-base font-semibold text-textcolor2 mt-2">{item.title}</h3>
                  <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tutoring & catalogue CTAs for SEO and discovery */}
      <section className="px-6 md:px-12 py-12 md:py-16 border-t border-Primarycolor/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-textcolor2 text-center mb-6">
            More ways to work with us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/careers"
              className="rounded-xl border border-Primarycolor/30 bg-bgcolor2/50 p-4 md:p-5 hover:border-Primarycolor/50 hover:shadow-md transition-all duration-200 group"
            >
              <h3 className="text-base font-semibold text-textcolor2 group-hover:text-Secondarycolor transition-colors">
                Tutoring & training
              </h3>
              <p className="text-gray-400 mt-1.5 text-sm leading-relaxed">
                Learn with us structured programmes to upskill your team or start a career in tech. Apply and get access to our LMS and hands-on projects.
              </p>
              <span className="inline-block mt-4 text-Secondarycolor text-sm font-medium">Explore careers & learning →</span>
            </Link>
            <Link
              to="/catalogues"
              className="rounded-xl border border-Primarycolor/30 bg-bgcolor2/50 p-4 md:p-5 hover:border-Primarycolor/50 hover:shadow-md transition-all duration-200 group"
            >
              <h3 className="text-base font-semibold text-textcolor2 group-hover:text-Secondarycolor transition-colors">
                Service catalogue & instant checkout
              </h3>
              <p className="text-gray-400 mt-1.5 text-sm leading-relaxed">
                Choose a fixed-price package, pay online, and get started. No lengthy quotes—browse our catalogue and checkout instantly.
              </p>
              <span className="inline-block mt-4 text-Secondarycolor text-sm font-medium">Browse catalogue →</span>
            </Link>
          </div>
        </div>
      </section>

      <CataloguePreview />
      <Servicesslide />
      <StatsSection />
      <QuickContact />
      <Subscription />
    </div>
  );
};

export default Home;
