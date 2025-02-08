import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import slide_img from "../../assets/slide.jpg";
import solution_img from "../../assets/solution.jpg";
import diet_img from "../../assets/diet2.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const features = [
  {
    id: 1,
    image: slide_img,
    title: "Personalized Dashboard",
    description: "Track your health metrics with an interactive and user-friendly dashboard.",
    icon: "📊",
  },
  {
    id: 2,
    image: solution_img,
    title: "Personalized Solution",
    description: "Get customized AI-driven recommendations tailored for you.",
    icon: "🧠",
  },
  {
    id: 3,
    image: diet_img,
    title: "Diet And Exercise",
    description: "Stay fit with personalized diet plans and workout suggestions.",
    icon: "🏋️",
  },
];

const EnhancedFeatureSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-blue-900 mb-6">Key Features</h2>
          <div className="w-24 h-2 bg-blue-500 mx-auto rounded-full" />
        </motion.div>

        {/* Custom Navigation Arrows */}
        <button className="custom-prev-button absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-4 rounded-full shadow-lg hover:bg-blue-50 transition-all duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-500"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button className="custom-next-button absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-4 rounded-full shadow-lg hover:bg-blue-50 transition-all duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-500"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          effect="fade"
          fadeEffect={{ crossFade: true }} // Smooth fade effect
          navigation={{
            nextEl: ".custom-next-button",
            prevEl: ".custom-prev-button",
          }}
          pagination={{
            clickable: true,
            el: ".custom-pagination",
            bulletClass: "custom-bullet",
            bulletActiveClass: "custom-bullet-active",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="rounded-2xl !overflow-visible"
        >
          {features.map((feature) => (
            <SwiperSlide key={feature.id}>
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center p-8 bg-white rounded-2xl shadow-md ml-20 mr-20 overflow-hidden">
                
                {/* Light Rays Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-blue-200/30 pointer-events-none"></div>

                {/* Left - Image */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative group"
                >
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="relative w-full h-[400px] object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-300"
                  />
                </motion.div>

                {/* Right - Text */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="space-y-6"
                >
                  <span className="text-6xl">{feature.icon}</span>
                  <h3 className="text-4xl font-bold text-blue-900">{feature.title}</h3>
                  <p className="text-xl text-blue-600">{feature.description}</p>
                  <button className="group flex items-center gap-2 text-lg font-semibold text-blue-500 hover:text-blue-700 transition-colors">
                    Learn More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 group-hover:translate-x-1 transition-transform"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Pagination */}
        <div className="custom-pagination flex justify-center gap-4 mt-8" />

        {/* Styles */}
        <style jsx>{`
          .custom-bullet {
            width: 12px;
            height: 12px;
            display: inline-block;
            border-radius: 50%;
            background: #BFDBFE;
            margin: 0 4px;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .custom-bullet-active {
            background: #3B82F6;
            transform: scale(1.2);
          }

          .swiper-button-disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }

          .custom-prev-button:hover,
          .custom-next-button:hover {
            transform: translateY(-50%) scale(1.1);
          }

          .swiper-slide-active {
            animation: fadeIn 0.5s ease-in-out;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default EnhancedFeatureSection;
