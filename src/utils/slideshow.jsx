import Marquee from "react-fast-marquee";

import { Ur9, Phoenixs, Qlogo, Fgroup , Dtech, Pelifts, Smiggle, NMI} from "../components/images";
const companies = [
  { name: "UR9 Group", logo: Ur9 },
  { name: "PE Lifts Ghana", logo: Pelifts },
  // { name: "Sure Switch", logo: "/logos/sureswitch.png" },
  { name: "Smiggle IASOL", logo: Smiggle },
  { name: "NMI", logo: NMI },
  { name: "Fhemfel Group", logo: Fgroup },
  { name: "Quisitive Lounge", logo: Qlogo },
  { name: "Phoenixs Tech", logo: Phoenixs },
  { name: "Decot Tech", logo: Dtech },
];

const CompanySlider = () => {
  return (
    <div className="py-6 bg-">
      <Marquee speed={40} gradient={false} pauseOnHover={true}>
        {companies.map((company, index) => (
          <div
            key={index}
            className="mx-4 flex items-center  flex-col justify-center mt-4 min-w-[120px]"
          >
            <img

              src={company.logo}
              alt={company.name}
              className="h-14 w-auto object-contain hover:grayscale-0 transition-all duration-300"
            />
          
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default CompanySlider;