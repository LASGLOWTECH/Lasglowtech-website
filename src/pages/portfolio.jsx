import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "../utils/seo";
import useAOS from "../hooks/useAos";
import Subscription from "../components/sections/subscription";
import QuickContact from "../components/sections/Quickcontact";
import PortfolioTabs from "../components/sections/portfoliotabs";
import CompanySlider from "../utils/slideshow";
import { FaExternalLinkAlt } from "react-icons/fa";

const caseStudies = [
  {
    title: "UR9 Group",
    category: "Websites",
    summary: "Corporate website for UR9 Group with modern layout, clear navigation, and brand-aligned design.",
    challenge: "Client needed a professional online presence to showcase services and build credibility.",
    solution: "Delivered a responsive website with clean UI, fast performance, and easy content updates.",
    result: "Improved brand visibility and lead generation through a polished digital presence.",
    link: "https://ur9group.com",
    cta: "View site",
  },
  {
    title: "Phoenixs Tech",
    category: "Websites",
    summary: "React/Vite-powered tech company site for Phoenixs Tech (Poland) with a global audience in mind.",
    challenge: "Tech company required a scalable, performant site that reflects their engineering standards.",
    solution: "Built with React and Vite for speed and maintainability; responsive and accessible.",
    result: "Fast load times and a professional platform that supports international reach.",
    link: "https://phoenixstech.com",
    cta: "View site",
  },
  {
    title: "BriteBerry Branding",
    category: "Branding",
    summary: "End-to-end packaging and brand identity for BriteBerry, from concept to final assets.",
    challenge: "New brand needed distinctive packaging and visual identity to stand out on shelf and online.",
    solution: "Created cohesive packaging design, color system, and brand guidelines for consistency.",
    result: "A recognizable brand identity ready for product launch and marketing campaigns.",
    link: "https://dribbble.com/shots/27016784-Brite-Berry-Branding",
    cta: "View project",
  },
];

export default function Portfolio() {
  useAOS();

  return (
    <div className="min-h-screen bg-bgcolor text-textcolor2">
      <SEO
        title="Lasglowtech | Portfolio"
        description="Care to know who we have worked for? Explore our portfolio of websites, branding, and design projects."
        keywords="Portfolio, Lasglowtech, case studies, web design, branding"
        url="https://www.lasglowtech.com.ng/portfolio"
      />

      {/* Hero */}
      <section className="relative border-b border-Primarycolor/20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bgcolor2/80 to-bgcolor" />
        <div className="relative max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24 text-center">
          <p className="text-sm font-medium text-Secondarycolor uppercase tracking-widest mb-4" data-aos="fade-up">
            Portfolio
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-textcolor2 tracking-tight" data-aos="zoom-up">
            Work we’re proud of
          </h1>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto leading-relaxed" data-aos="fade-up">
            Websites, branding, and creative projects delivered with style, precision, and a focus on results.
          </p>
          <nav
            className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-400"
            aria-label="Breadcrumb"
          >
            <Link to="/" className="hover:text-Secondarycolor transition-colors">
              Home
            </Link>
            <span aria-hidden>/</span>
            <span className="text-Secondarycolor">Portfolio</span>
          </nav>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-textcolor2 leading-tight mb-4">
            Discover who we’ve rendered creative services to
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            We’ve delivered results with style, precision, and a touch of sleek innovation. Filter by category below to explore our work.
          </p>
        </motion.div>
      </section>

      <CompanySlider />

      {/* Portfolio tabs (all work) */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 pb-16">
        <PortfolioTabs />
      </section>

      {/* Case studies */}
      <section className="border-t border-Primarycolor/20 bg-bgcolor2/30">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-20">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-Secondarycolor">Case studies</p>
            <h2 className="text-3xl md:text-4xl font-bold text-textcolor2 mt-2">Selected projects in depth</h2>
            <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
              A closer look at how we approach challenges and deliver outcomes for our clients.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.article
                key={study.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="rounded-2xl border border-Primarycolor/20 bg-bgcolor/80 p-6 md:p-7 hover:border-Primarycolor/40 transition-colors flex flex-col"
              >
                <span className="text-xs font-semibold text-Secondarycolor uppercase tracking-wider">
                  {study.category}
                </span>
                <h3 className="text-xl font-semibold text-textcolor2 mt-2">{study.title}</h3>
                <p className="text-gray-400 text-sm mt-2 leading-relaxed">{study.summary}</p>
                <div className="mt-4 space-y-2 text-sm">
                  <p className="text-gray-500">
                    <span className="font-medium text-gray-400">Challenge:</span> {study.challenge}
                  </p>
                  <p className="text-gray-500">
                    <span className="font-medium text-gray-400">Solution:</span> {study.solution}
                  </p>
                  <p className="text-gray-500">
                    <span className="font-medium text-gray-400">Result:</span> {study.result}
                  </p>
                </div>
                <a
                  href={study.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-Secondarycolor font-medium text-sm hover:underline"
                >
                  {study.cta}
                  <FaExternalLinkAlt className="w-4 h-4" />
                </a>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <QuickContact />
      <Subscription />
    </div>
  );
}
