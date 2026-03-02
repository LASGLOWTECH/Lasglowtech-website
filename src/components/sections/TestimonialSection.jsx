import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { RiDoubleQuotesL } from "react-icons/ri";
import useAOS from "../../hooks/useAos";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Testimony from "../../assets/data/Testimonials";

const TestimonialSection = () => {
  useAOS();
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = Testimony.length;
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current?.params) {
      swiperRef.current.params.navigation.prevEl = ".prevBtn";
      swiperRef.current.params.navigation.nextEl = ".nextBtn";
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);

  return (
    <section className="relative py-16 md:py-24 overflow-hidden border-t border-Primarycolor/20 bg-bgcolor2/30">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-Secondarycolor uppercase tracking-widest mb-2">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-textcolor2">
            What our clients say
          </h2>
          <p className="mt-2 text-gray-400 max-w-xl mx-auto text-sm md:text-base">
            Real feedback from brands and teams we’ve worked with.
          </p>
        </div>

        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            pagination={{ clickable: true }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
            className="w-full"
          >
            {Testimony.map((item) => (
              <SwiperSlide key={item.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="rounded-2xl border border-Primarycolor/20 bg-bgcolor/60 p-6 md:p-10"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                    <div className="lg:col-span-4 flex justify-center lg:justify-start">
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-40 h-40 md:w-52 md:h-52 object-contain rounded-xl bg-bgcolor2/50 p-2 border border-Primarycolor/15"
                        />
                        {item.previews?.length > 0 && (
                          <div className="hidden lg:flex gap-2 mt-3 justify-center lg:justify-start">
                            {item.previews.slice(0, 2).map((src, i) => (
                              <img
                                key={i}
                                src={src}
                                alt=""
                                className="w-14 h-14 object-contain rounded-lg border border-Primarycolor/15 bg-bgcolor2/30 opacity-90"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="lg:col-span-8 flex flex-col justify-center">
                      <RiDoubleQuotesL className="text-4xl md:text-5xl text-Secondarycolor/40 mb-4" aria-hidden />
                      <blockquote className="text-gray-400 text-base md:text-lg leading-relaxed">
                        {item.text}
                      </blockquote>
                      <footer className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <cite className="not-italic font-semibold text-textcolor2 text-lg">
                            {item.name}
                          </cite>
                          <p className="text-sm text-gray-500">{item.role}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            className="prevBtn p-2.5 rounded-full border border-Primarycolor/40 text-textcolor2 hover:bg-Primarycolor/20 transition-colors"
                            aria-label="Previous testimonial"
                          >
                            <FaArrowLeft className="w-4 h-4" />
                          </button>
                          <span className="text-sm text-gray-500 tabular-nums min-w-[3ch] text-center">
                            {currentIndex + 1} / {totalSlides}
                          </span>
                          <button
                            type="button"
                            className="nextBtn p-2.5 rounded-full border border-Primarycolor/40 text-textcolor2 hover:bg-Primarycolor/20 transition-colors"
                            aria-label="Next testimonial"
                          >
                            <FaArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </footer>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div
          className="absolute bottom-4 left-0 right-0 text-center text-[5rem] md:text-[8rem] font-bold text-gray-300/5 select-none pointer-events-none leading-none hidden md:block"
          aria-hidden
        >
          Testimonials
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
