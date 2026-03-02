import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";

const currentYear = new Date().getFullYear();

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/catalogues", label: "Catalogues" },
  { to: "/careers", label: "Careers" },
  { to: "/blogs", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

const socialLinks = [
  { href: "https://linkedin.com/in/austinosaz", icon: FaLinkedinIn, label: "LinkedIn" },
  { href: "https://twitter.com/OmozemojeAugus1", icon: BsTwitter, label: "Twitter" },
  { href: "https://m.facebook.com/omozemoje.augustineoisasoje", icon: FaFacebookF, label: "Facebook" },
  { href: "https://www.instagram.com/lasglowtech", icon: FaInstagram, label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="bg-bgcolor2 border-t border-Primarycolor/20 text-textcolor2">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-Secondarycolor mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-gray-400 hover:text-Secondarycolor transition-colors text-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-Secondarycolor mb-4">
              Quick links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/catalogues" className="text-gray-400 hover:text-Secondarycolor transition-colors text-sm">
                  Service catalogue & checkout
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-400 hover:text-Secondarycolor transition-colors text-sm">
                  Tutoring & training
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-Secondarycolor transition-colors text-sm">
                  Get in touch
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-Secondarycolor mb-4">
              Lasglowtech
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              We build digital products, offer tutoring and training, and a service catalogue with instant checkout—so you can grow with clarity and confidence.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-Secondarycolor mb-4">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-Primarycolor/20 text-Secondarycolor">
                  <FaEnvelope className="text-sm" />
                </span>
                <a
                  href="mailto:lasglowtech@gmail.com"
                  className="text-gray-400 hover:text-Secondarycolor transition-colors text-sm break-all"
                >
                  lasglowtech@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-Primarycolor/20 text-Secondarycolor">
                  <FaPhoneAlt className="text-sm" />
                </span>
                <a
                  href="tel:+2349031821590"
                  className="text-gray-400 hover:text-Secondarycolor transition-colors text-sm"
                >
                  +234 903 182 1590
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-Primarycolor/20 text-Secondarycolor">
                  <FaMapMarkerAlt className="text-sm" />
                </span>
                <span className="text-gray-400 text-sm">Gwarinpa, FCT Abuja</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-Primarycolor/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} Lasglowtech. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-Primarycolor/15 text-gray-400 hover:bg-Primarycolor/30 hover:text-Secondarycolor transition-colors"
                aria-label={label}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
