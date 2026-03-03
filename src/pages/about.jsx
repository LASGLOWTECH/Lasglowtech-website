import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaCircle } from "react-icons/fa";
import { Aboutimg2, Contactimg } from "../components/images";

// About section image: use Aboutimg2 for your own asset, or this Unsplash placeholder (creative team/workspace)
const ABOUT_SECTION_IMAGE =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80";
import Subscription from "../components/sections/subscription";
import MeetTheTeam from "../components/meetheteam";
import CoreValues from "../components/sections/corevalues";
import FaqSection from "../components/Faq";
import SEO from "../utils/seo";
import useAOS from "../hooks/useAos";

const capabilities = [
  "Web development for business platforms, e‑commerce, and high-converting websites that are fast, secure, and scalable.",
  "Mobile app development for Android and iOS with native and cross-platform options, from MVP to full product launch.",
  "UI/UX design systems focused on clarity, usability, and conversion—wireframes, prototypes, and design handoff.",
  "Brand and graphic design for campaigns, social content, and customer engagement that stays on-brand and on-message.",
  "Professional tutoring and IT training programmes to upskill your team or start a career in tech—structured learning with real-world projects.",
  "Service catalogue with fixed-price packages and instant online checkout so you can buy a package and get started without lengthy quotes.",
];

const process = [
  {
    title: "Discovery",
    text: "We start by aligning on your business goals, audience, and success metrics. We map the customer journey and technical direction so every decision from day one supports your vision. No guesswork—clear scope and a shared roadmap before we write a line of code or open a design file.",
  },
  {
    title: "Design and Build",
    text: "Our team turns that roadmap into production-ready design and code. We use modern tools and practices, with quality checks at every stage. You get iterative feedback loops, so you see progress early and can steer as we go. The result is a product that looks great, works reliably, and is built to last.",
  },
  {
    title: "Launch and Growth",
    text: "We don’t stop at launch. We deploy with care, monitor performance, and optimize based on real usage and data. Ongoing support and iterations keep your product aligned with your growth—so it continues to perform as your business scales and your needs evolve.",
  },
];

const About = () => {
  useAOS();

  return (
    <div className="min-h-screen bg-bgcolor text-textcolor2">
      <SEO
        title="About Lasglowtech | Digital Agency, Tutoring & Service Catalogue Nigeria"
        description="Lasglowtech: web and mobile development, UI/UX design, IT tutoring and training, and a service catalogue with instant checkout. Learn about our team, process, and how we help brands grow."
        keywords="About Lasglowtech, digital agency Nigeria, web development, tutoring, tech training, service catalogue, instant checkout"
        url="https://www.lasglowtech.com.ng/about"
      />

      {/* Hero */}
      <section className="relative border-b border-Primarycolor/20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${Contactimg})` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bgcolor/90 via-bgcolor/80 to-bgcolor" />
        <div className="relative max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24 text-center">
          <p
            className="text-sm font-medium text-Secondarycolor uppercase tracking-widest mb-4"
            data-aos="fade-up"
          >
            About us
          </p>
          <h1
            className="text-2xl md:text-3xl font-bold text-textcolor2 tracking-tight max-w-3xl mx-auto"
            data-aos="zoom-up"
          >
            We build digital products that drive growth
          </h1>
          <p className="mt-4 text-gray-400 text-sm max-w-2xl mx-auto leading-relaxed" data-aos="fade-up">
            From strategy and design to development and launch—we help brands compete confidently in a digital-first world with solutions that are useful, reliable, and built to scale.
          </p>
          <nav
            className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-400"
            aria-label="Breadcrumb"
          >
            <Link to="/" className="hover:text-Secondarycolor transition-colors">
              Home
            </Link>
            <span aria-hidden>/</span>
            <span className="text-Secondarycolor">About</span>
          </nav>
        </div>
      </section>

      {/* Who we are */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="rounded-xl overflow-hidden border border-Primarycolor/20 shadow-md" data-aos="fade-right">
            <img
              src={ABOUT_SECTION_IMAGE}
              alt="Lasglowtech team and workspace"
              className="w-full h-52 md:h-64 object-cover max-h-80"
            />
          </div>
          <div data-aos="fade-left">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-Secondarycolor mb-4">
              <FaCircle className="text-[6px]" />
              Who we are
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-textcolor2 leading-tight mb-4">
              A creative technology partner for modern brands
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed mb-3">
              Lasglowtech began as a vision in 2020 and launched in 2021 with a clear mission: help businesses
              compete confidently in a digital-first world. We combine design, engineering, and strategy to deliver
              solutions that are not only beautiful, but useful, reliable, and growth-ready.
            </p>
            <p className="text-gray-300 text-sm leading-relaxed mb-3">
              We work with startups, founders, and established teams that want better digital products, stronger
              brand communication, and measurable business outcomes. Whether you need a new website, an app, a
              design system, or a full product from idea to launch, we bring the same focus: clarity in process,
              quality in delivery, and a long-term view so your investment pays off.
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              Our team blends creative and technical skills—so you get one partner who can think in both design and
              code, communicate in plain language, and keep projects on track. That’s how we’ve built lasting
              relationships with clients across industries and continue to grow with them.
            </p>
          </div>
        </div>
      </section>

      {/* What we deliver & How we work */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <article
            className="rounded-xl border border-Primarycolor/25 bg-bgcolor2/50 p-4 md:p-5 hover:border-Primarycolor/40 transition-colors"
            data-aos="fade-up"
          >
            <h3 className="text-base font-semibold text-textcolor2 mb-2">What we deliver</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              We focus on the disciplines that move the needle for brands: strategy-backed design, solid engineering, and clear communication. Here’s where we add the most value.
            </p>
            <ul className="space-y-4">
              {capabilities.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-300">
                  <FaCheckCircle className="text-Secondarycolor mt-1 flex-shrink-0 w-5 h-5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article
            className="rounded-xl border border-Primarycolor/25 bg-bgcolor2/50 p-4 md:p-5 hover:border-Primarycolor/40 transition-colors"
            data-aos="fade-up"
          >
            <h3 className="text-base font-semibold text-textcolor2 mb-2">How we work</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              We follow a structured but flexible process so you always know where things stand and can influence direction at the right moments.
            </p>
            <div className="space-y-4">
              {process.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-xl border border-Primarycolor/20 bg-bgcolor/30 p-5"
                >
                  <p className="text-Secondarycolor font-semibold text-sm mb-1">
                    {String(index + 1).padStart(2, "0")}. {step.title}
                  </p>
                  <p className="text-sm text-gray-300 leading-relaxed">{step.text}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      {/* Why choose us */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <article
          className="rounded-xl border border-Primarycolor/25 bg-bgcolor2/50 p-4 md:p-6 text-center md:text-left"
          data-aos="fade-up"
        >
          <h3 className="text-xl md:text-2xl font-semibold text-textcolor2 mb-4">
            Why clients choose Lasglowtech
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            Clients trust us because we stay practical, transparent, and outcome-focused. We communicate clearly,
            build with intent, and align every deliverable with your business priorities.
          </p>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            From the first strategy session through deployment and post-launch support, our focus stays the same:
            deliver quality work that creates lasting value. We don’t over-promise—we scope realistically, keep
            you informed, and iterate based on your feedback so the final product truly fits your needs.
          </p>
          <p className="text-gray-300 text-sm leading-relaxed max-w-3xl">
            Whether you’re launching something new or improving what you have, we’re here as a long-term partner:
            one team that understands both the creative and technical sides of your project and is invested in your
            success.
          </p>
        </article>
      </section>

      <CoreValues />
      <MeetTheTeam />
      <Subscription />
      <FaqSection />
    </div>
  );
};

export default About;
