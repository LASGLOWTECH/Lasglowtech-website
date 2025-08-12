import { useEffect, useState } from "react";
import { BsFillArrowUpCircleFill } from 'react-icons/bs';

const ScrollTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ScrolltoTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!show) return null;

  return (
    <button
      onClick={ScrolltoTop}
      className="fixed bottom-6 left-6 z-50 animate-pulse"
      aria-label="Scroll to top"
    >
      <BsFillArrowUpCircleFill className="text-4xl text-Secondarycolor me-6 hover:text-textcolor2" />
    </button>
  );
};

export default ScrollTop;
