import React, { useState } from 'react';
import PortfolioCard from '../portfoliocards';
import {pelifts,heroimage,fiftyreign,Fhemfelhomes,
Phoenixcover,ur9group,Smiggle1,Smiggle2,Smiggle3,Smiggle4,RWA,DECOT,ur9graph,Austinport, } from "../images";
const tabs = ['All', 'Branding', 'Websites', 'Graphics', 'Web/UI'];

const portfolioData = {




  
  Websites : [
    {
      image: ur9graph,
      description: 'UR9 Group',
      link: 'https://ur9group.com',
    },

     {
      image: Austinport,
      description: 'Brand Website',
      link: 'https://lasglowtech.com.ng',
    },

    
     {
      image: Austinport,
      description: 'Company website Wordpress',
      link: 'https://greatnationluxuryhomes.com/',
    },
     {
      image: Austinport,
      description: 'Restaurant Website, Next JS ',
      link: 'https://pantherarestlounge.com',
    },
    {
      image: Phoenixcover,
      description: 'Phoenixs Tech, Poland- React/Vite',
      link: 'https://phoenixstech.com',
    },
    {
      image: Austinport,
      description: 'Personal Portfolio, Next js',
      link: 'https://austinosaz.vercel.app',
    },
{
      image: Austinport,
      description: 'Jobs pro clone, Vite-react',
      link: 'https://jobspro-clone-zeta.vercel.app/',
    },

    {
      image: RWA,
      description: 'Renaissance Web3 African (ongoing)',
      link: 'https://renaissanceweb3afrik.com/',
    },

    {
      image: DECOT,
      description: 'Decot Tech',
      link: 'https://decot-technology.com/',
    },
  ],
  Branding: [
    {
      image: Smiggle3,
      description: 'Car Branding.',
      link: 'https://dribbble.com/Austinosaz',
    },
    {
      image: pelifts,
      description: 'Logo design and marketing materials',
      link: 'https://dribbble.com/Austinosaz',
    },
  ],
  Graphics: [
    {
      image: ur9group,
      description: 'Social media flyer for campaign.',
      link: 'https://dribbble.com/Austinosaz',
    },

    {
      image: Fhemfelhomes,
      description: 'Fhemfel homes.',
      link: 'https://dribbble.com/Austinosaz',
    },

    {
      image: Smiggle2,
      description: 'Social media post for Smiggle.',
      link: 'https://lasglowtech/austine-osaz/',
    },

    {
      image: Smiggle3,
      description: 'Social media post for Smiggle.',
      link: 'https://example.com/graphic4',
    },

    {
      image: Smiggle4,
      description: 'Social media post for Smiggle.',
      link: 'https://www.pinterest.com/lasglowtech/pins/',
    },
    {
      image: pelifts,
      description: 'Social media post for Ur9group.',
      link: 'https://www.pinterest.com/lasglowtech/pins/',
    }
  ],
  'Web/UI': [
    {
      image: '/projects/webui1.jpg',
      description: 'Dashboard UI for analytics platform.',
      link: 'https://www.pinterest.com/lasglowtech/pins/',
    },
    {
      image: RWA ,
      description: 'Portfolio site for designer.',
      link: 'https://www.pinterest.com/lasglowtech/pins/',
    },


    
  ],
};

const PortfolioTabs = () => {
  const [activeTab, setActiveTab] = useState('All');

  // Combine all projects if 'All' is selected
  const projects =
    activeTab === 'All'
      ? Object.values(portfolioData).flat()
      : portfolioData[activeTab] || [];

  return (
    <div className=" text-white px-6 md:px-20 mx-auto mt-6 py-20">
      {/* Tabs */}
      <div className="flex flex-wrap justify-center mb-10 gap-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-3 border text-sm md:text-lg rounded-2xl shadow-md transition-all duration-300 ${
              activeTab === tab
                ? 'bg-gradient-to-r from-Primarycolor to-Primarycolor2  text-white border-Primarycolor1 hover:bg-Secondarycolor'
                : 'text-textcolor border-Primarycolor hover:bg-Secondarycolor hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid layout */}
<div className='mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 py-16 items-center'>




        {projects.length > 0 ? (
          projects.map((item, index) => (
            <PortfolioCard
              key={index}
              image={item.image}
              alt={`${activeTab} ${index + 1}`}
              description={item.description}
              link={item.link}
              delay={index * 0.1}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-300 text-lg">
            No projects in this category.
          </p>
        )}
      
</div>

      
    </div>
  );
};

export default PortfolioTabs;
