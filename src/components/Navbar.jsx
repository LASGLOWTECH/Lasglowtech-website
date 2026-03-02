import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";
import { LOGO } from "./images";
import { clearSession, getUser, isAuthenticated } from "../utils/auth";

export default function Navbar() {
  const [show, setShow] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const authed = isAuthenticated();
  const user = getUser();
  const role = user?.role || "client";

  const guestLinks = [
    { link: "Home", to: "/" },
    { link: "About Us", to: "/about" },
    { link: "Services", to: "/services" },
    { link: "Portfolio", to: "/portfolio" },
    { link: "Blogs", to: "/blogs" },
  ];
  const clientLinks = [...guestLinks, { link: "Catalogues", to: "/catalogues" }];
  const learnerLinks = [...guestLinks, { link: "Careers", to: "/careers" }];
  const navLinks = !authed ? [...guestLinks, { link: "Careers", to: "/careers" }, { link: "Catalogues", to: "/catalogues" }] : role === "client" ? clientLinks : learnerLinks;

  const desktopNavClass = ({ isActive }) =>
    `px-2.5 font-medium tracking-wide text-sm transition-all duration-300 ${
      isActive ? "text-Secondarycolor" : "text-white hover:text-Secondarycolor"
    }`;

  const mobileNavClass = ({ isActive }) =>
    `py-3 font-medium tracking-wide text-base transition-all duration-200 ${
      isActive ? "text-Secondarycolor" : "text-ash2 hover:text-Secondarycolor"
    }`;

  return (
    <div className="z-50 px-6 bg-gradient-to-r from-bgcolor2 to-bgcolor2 w-full md:px-24">
      <div className="mx-auto flex justify-between w-full items-center py-4">
        <div className="text-6xl">
          <Link to="/">
            <img src={LOGO} width={60} height={60} alt="Lasglowtech logo" />
          </Link>
        </div>

        <div className="hidden md:flex flex-col md:flex-row justify-end">
          {navLinks.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === "/"} className={desktopNavClass}>
              {item.link}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2.5 relative">
          {!authed && (
            <>
              <NavLink
                to="/auth/login"
                className={({ isActive }) =>
                  `text-sm font-medium transition-all duration-300 ${
                    isActive ? "text-Secondarycolor" : "text-white hover:text-Secondarycolor"
                  }`
                }
              >
                Login
              </NavLink>
              <Link to="/auth/register">
                <button className="px-4 py-2 text-sm bg-gradient-to-r from-Primarycolor to-Primarycolor1 hover:from-Secondarycolor hover:to-Secondarycolor shadow-lg text-white font-semibold rounded-full transition-all duration-300">
                  Sign Up
                </button>
              </Link>
            </>
          )}
          {authed && (
            <>
              <span className="text-white text-xs md:text-sm">Hi, {user?.username || "Client"}</span>
              <div className="relative">
                <button
                  onClick={() => setShowAccountMenu((prev) => !prev)}
                  className="px-4 py-2 text-sm border border-Primarycolor text-white rounded-full hover:bg-Primarycolor transition-all duration-300"
                >
                  My Account
                </button>
                {showAccountMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl border border-Primarycolor/40 bg-bgcolor2 shadow-lg z-50 overflow-hidden">
                    {role === "client" && (
                      <Link
                        to="/client/dashboard"
                        onClick={() => setShowAccountMenu(false)}
                        className="block px-4 py-3 text-sm text-white hover:bg-Primarycolor/20 transition-all"
                      >
                        Client Dashboard
                      </Link>
                    )}
                    {(role === "learner" || role === "student" || role === "talent") && (
                      <Link
                        to="/careers/dashboard"
                        onClick={() => setShowAccountMenu(false)}
                        className="block px-4 py-3 text-sm text-white hover:bg-Primarycolor/20 transition-all"
                      >
                        Learner Dashboard
                      </Link>
                    )}
                  </div>
                )}
              </div>
              <button
                onClick={() => {
                  clearSession();
                  window.location.href = "/";
                }}
                className="px-4 py-2 text-sm border border-Primarycolor text-white rounded-full hover:bg-Primarycolor transition-all duration-300"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {!show && (
          <div className="flex items-center md:hidden">
            <RxHamburgerMenu className="text-white w-7 h-7" onClick={() => setShow(true)} />
          </div>
        )}
        {show && (
          <div className="flex items-center md:hidden">
            <AiOutlineClose className="text-white w-7 h-7" onClick={() => setShow(false)} />
          </div>
        )}
      </div>

      {show && (
        <motion.div
          className="md:hidden flex flex-col pt-16 px-6 fixed top-0 left-0 w-64 bg-textcolor h-screen z-50 shadow-lg"
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          exit={{ x: "-100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={mobileNavClass}
              onClick={() => setShow(false)}
            >
              {item.link}
            </NavLink>
          ))}

          {!authed && (
            <>
              <NavLink to="/auth/login" className={mobileNavClass} onClick={() => setShow(false)}>
                Login
              </NavLink>
              <NavLink to="/auth/register" className={mobileNavClass} onClick={() => setShow(false)}>
                Sign Up
              </NavLink>
            </>
          )}
          {authed && (
            <>
              {role === "client" && (
                <NavLink to="/client/dashboard" className={mobileNavClass} onClick={() => setShow(false)}>
                  Client Dashboard
                </NavLink>
              )}
              {(role === "learner" || role === "student" || role === "talent") && (
                <NavLink to="/careers/dashboard" className={mobileNavClass} onClick={() => setShow(false)}>
                  Learner Dashboard
                </NavLink>
              )}
              <button
                onClick={() => {
                  clearSession();
                  window.location.href = "/";
                }}
                className="w-full text-left text-ash2 py-3 font-medium transition-all duration-300 hover:text-Secondarycolor"
              >
                Logout
              </button>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
}
