// components/SiteLoader.jsx
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { LOGO } from "./images"; 

const SiteLoader = () => {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setFadeOut(true);
      setTimeout(() => setLoading(false), 500);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0  z-50 transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Centered Logo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={LOGO}
          alt="Logo"
          className="h-[100px] w-[100px] object-contain"
        />
      </div>

      {/* Small spinner at bottom */}
      <div className="absolute bottom-8 w-full flex justify-center">
        <MoonLoader color="#321C94" size={25} />
      </div>
    </div>
  );
};

export default SiteLoader;
