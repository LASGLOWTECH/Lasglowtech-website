import React from 'react';
import CompanySlider from '../utils/slideshow';
import Hero from '../components/sections/hero';
import OurServices from '../components/sections/ourservices';
import VerticalTabs from '../components/verticaltabs';
import Servicesslide from '../components/sections/Servicesslide';
import StatsSection from '../components/sections/BusinessSection';
import QuickContact from '../components/sections/Quickcontact';
import Subscription from '../components/sections/subscription';
import SEO from '../utils/seo';
const Home = () => {
    return (
        <div className="bg-gradient-to-r from-bgcolor2 to-bgcolor2 ">
            
            <SEO
                   title="Home | Lasglowtech Digital Services"
                    description="Welcome to Lasglowtech Digital Services  , where we transform ideas to reality"
                    keywords="Home, Lasglowtech digital services"
                    url="https://www.lasglowtech.com.ng.com"
                
                  />
            <Hero />
            <CompanySlider />
            <VerticalTabs/>
            <OurServices />
            <Servicesslide />
            <StatsSection />
            <QuickContact/>
            <Subscription/>
        </div>
    );
};

export default Home;