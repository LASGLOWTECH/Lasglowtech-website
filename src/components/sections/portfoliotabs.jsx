import React, { useState } from 'react';
import PortfolioCard from '../portfoliocards';
import {pelifts,heroimage,fiftyreign,Fhemfelhomes, Fhemfelhomes2, BriteB, BriteA,
Phoenixcover,ur9group,Smiggle2,Smiggle3,Smiggle4,RWA,DECOT,ur9graph,Austinport,Panth, Portweb,Osaz,
Fhemfeltravels1,
GreatN,
Lasglow1,
SureSwitch,
Graphic2,
Web1,
 } from "../images";
const tabs = ['All', 'Branding', 'Websites', 'Graphics', 'Web/UI'];

const portfolioData = {




  
  Websites : [
    {
      image: ur9graph,
      description: 'UR9 Group',
      link: 'https://ur9group.com',
    },

     {
      image: Portweb,
      description: 'Brand Website',
      link: 'https://lasglowtech.com.ng',
    },

    
     {
      image: GreatN,
      description: 'Company website Wordpress',
      link: 'https://greatnationluxuryhomes.com/',
    },
     {
      image: Panth,
      description: 'Restaurant Website, Next JS ',
      link: 'https://pantherarestlounge.com',
    },
    {
      image: Phoenixcover,
      description: 'Phoenixs Tech, Poland- React/Vite',
      link: 'https://phoenixstech.com',
    },
    {
      image: Graphic2,
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
      image: BriteB,
      description: 'Packaging Design for BriteBerry Brand',
      link: 'https://dribbble.com/shots/27016784-Brite-Berry-Branding',
    },

    {
      image: BriteA,
      description: 'Packaging Design for BriteBerry Brand',
      link: 'https://dribbble.com/shots/27016784-Brite-Berry-Branding',
    },
  ],
  Graphics: [
    {
      image: ur9group,
      description: 'Social media flyer for campaign.',
      link: 'https://www.pinterest.com/lasglowtech/austine-osaz/ur9group-designs/',
    },

    {
      image: Fhemfelhomes2,
      description: 'Fhemfel homes.',
      link: 'https://dribbble.com/Austinosaz',
    },


    {
      image: Fhemfeltravels1,
      description: 'Social Media Designs for Fhemfel Travels.',
      link: 'https://dribbble.com/shots/25305695-Travel-flyer-design',
    },

   
     {
      image: SureSwitch,
      description: 'Social media design for SureSitch.',
      link: 'https://www.pinterest.com/lasglowtech/austine-osaz/sure-switch/',
    },

    {
      image: GreatN,
      description: 'Social media design for Great Nation Homes.',
      link: 'https://www.pinterest.com/lasglowtech/austine-osaz/great-nation-homes/',
    },

    {
      image: Smiggle4,
      description: 'Social media post for Smiggle.',
      link: 'https://www.pinterest.com/lasglowtech/pins/',
    },

    {
      image: Lasglow1,
      description: 'Personal branding design for Lasglowtech.',
      link: 'https://www.pinterest.com/lasglowtech/austine-osaz/lasglowtech/',
    },
    {
      image: pelifts,
      description: 'Social media design for Pe Lifts.',
      link: 'https://www.pinterest.com/lasglowtech/austine-osaz/pe-lifts-designs/',
    }
  ],
  'Web/UI': [
    {
      image: Web1,
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
