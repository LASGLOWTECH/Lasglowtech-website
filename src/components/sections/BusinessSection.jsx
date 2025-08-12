import React from "react";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import { useState } from "react";
import { Link } from 'react-router-dom';
const StatsSection = () => {
  const [counterOn, setCounterOn] = useState(false);

  const stats = [
    { value: 20, suffix: '+', label: 'Clients worked for' },
    { value: 7, suffix: 'years+', label: 'Work Experience' },
    { value: 2500, suffix: '+', label: 'Designed creatives' },
    { value: 2, suffix: 'M+', label: 'Leads generated' },
  ];

  return (
    <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
      <div className=" text-textcolor2  py-16 px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
          <div className="md:col-span-2 flex flex-col justify-center items-start">
            <h2 className="text-2xl md:text-4xl font-semibold mb-2">Got a Brand ?</h2>
            <p className="text-base mb-2 text-gray-400 font-medium tracking-tighr">We've got a Strategy required for productivity, custom solutions just for you from landing pages and e-commerce stores to full stack web apps that look sleek, load fast and convert better </p>
          <Link to="/about">
              <button className="mt-4 px-5 py-3  bg-gradient-to-r from-Primarycolor to-Primarycolor1 hover:from-Secondarycolor hover:to-Secondarycolor shadow-lg text-white font-semibold rounded-full transition-all duration-300">
             Learn More
            </button>
          </Link>
        </div>

          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="from-Primarycolor to-Primarycolor1 hover:from-Secondarycolor rounded-xl p-6 flex flex-col items-center text-center shadow-md  shadow-Primarycolor transition-shadow"
              >
                <h3 className="text-3xl md:text-4xl font-bold text-Secondarycolor">
                  {counterOn && (
                    <CountUp
                      start={0}
                      end={stat.value}
                      duration={2.5}
                      delay={0}
                      suffix={stat.suffix}
                    />
                  )}
                </h3>
                <p className="mt-2 text-sm md:text-base text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScrollTrigger>
  );
};

export default StatsSection;
