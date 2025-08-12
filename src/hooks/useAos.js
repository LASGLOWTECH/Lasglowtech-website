import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const useAOS = () => {
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  const refreshAOS = () => {
    AOS.refresh();
  };

  return refreshAOS;
};

export default useAOS;