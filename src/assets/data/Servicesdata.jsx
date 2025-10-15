import { BiSolidCheckShield } from "react-icons/bi";
import {
    FaChartBar,
    FaUserTie,
    FaTasks,
    FaLaptopCode,

    FaDatabase,
    FaLock,
    FaUniversity,
    FaCogs,
    FaLightbulb,
  } from "react-icons/fa";


const Servicet = [


  
    {
      titleKey: "Data Analytics Excellence",
        icon: <FaChartBar className="w-6 h-6 text-blue-600" />,
       descriptionKey:
          "We assemble a team of specialists to conduct thorough analysis and deliver customized data-driven solutions tailored to your needs.",
      },
      {
      titleKey: "UX & Business Analysis",
        icon: <FaUserTie className="w-6 h-6 text-pink-600" />,
        descriptionKey:
          "Expert services in UX design, UI/Usability, graphics, and advanced business systems analysis to align with your goals.",
      },
      {
    titleKey: "Project Management",
        icon: <FaTasks className="w-6 h-6 text-green-600" />,
      descriptionKey:
          "Experienced team handles complex projects and delivers seamless solutions across various project models.",
      },
      {
    titleKey: "Software Development",
        icon: <FaLaptopCode className="w-6 h-6 text-yellow-600" />,
       descriptionKey:
          "Specialists in advanced IT solutions for web, desktop, and mobile platforms with a focus on performance and innovation.",
      },
      {
      titleKey: "Quality Assurance",
        icon: <BiSolidCheckShield  className="w-6 h-6 text-indigo-600" />,
       descriptionKey:
          "Skilled consultants manage testing and QA processes across technologies to ensure reliable solutions.",
      },
      {
     titleKey: "Admin & Security",
        icon: <FaLock className="w-6 h-6 text-red-500" />,
   descriptionKey:
          "We execute Microsoft Technologies projects focusing on optimization, automation, and security.",
      },
      {
    titleKey: "Banking IT Solutions",
        icon: <FaUniversity className="w-6 h-6 text-cyan-500" />,
     descriptionKey:
          "We support IT projects in the banking sector, offering both on-site and remote system support.",
      },
      {
   titleKey: "IT Engineering Solutions",
        icon: <FaCogs className="w-6 h-6 text-orange-500" />,
     descriptionKey:
          "We deliver IT solutions for industries like automotive, rail, and oil & gas, with training programs.",
      },
      {
       titleKey: "ERP Implementation",
        icon: <FaDatabase className="w-6 h-6 text-violet-500" />,
       descriptionKey:
          "Optimize business operations through ERP, supporting owners with project workflow and data security.",
      },
      {
    titleKey: "Innovation & R&D",
        icon: <FaLightbulb className="w-6 h-6 text-teal-500" />,
        descriptionKey:
          "We build innovative IT solutions and develop tools that improve the efficiency of daily operations.",
      },
  ];
  
  export default Servicet;