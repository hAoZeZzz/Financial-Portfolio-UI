// Homepage.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";

const Homepage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/dashboard");
  };

  return (
    <div className="relative h-screen w-screen text-neutral-0 font-body overflow-hidden">
      {/* 🌈 背景模糊色块 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[40rem] h-[40rem] bg-green-400 rounded-full blur-3xl opacity-60 top-[-10rem] left-[-10rem]" />
        <div className="absolute w-[35rem] h-[35rem] bg-white rounded-full blur-3xl opacity-70 bottom-[-10rem] right-[-10rem]" />
        <div className="absolute w-[30rem] h-[30rem] bg-green-200 rounded-full blur-3xl opacity-50 top-[30%] left-[50%] translate-x-[-50%]" />
      </div>
     

      {/* 🧭 Swiper 内容区域 */}
      <Swiper
        direction="vertical"
        mousewheel={{ forceToAxis: true, sensitivity: 1 }}
        speed={800}
        modules={[Mousewheel]}
        className="h-full"
      >
        {/* Slide 1 - Hero */}
        <SwiperSlide>
          <div className="h-screen flex flex-col items-center justify-center text-center px-6">
             <div className=" flex flex-row items-center justify-center text-center px-6 gap-4 mb-4" >
              {/* 图片1 */}
             <div className="animate-float animate-seesaw-1 w-12 h-12 md:w-20 md:h-20 rounded-lg shadow-lg overflow-hidden">
             <img 
                src="src\pictures\1.jpg" 
                className="w-full h-full object-cover"
              />
             </div>
        
             {/* 图片2 */}
             <div className="animate-float animate-seesaw-2 w-12 h-12 md:w-20 md:h-20 rounded-lg shadow-lg overflow-hidden">
             <img 
                src="src\pictures\2.jpg" 
                className="w-full h-full object-cover"
              />
             </div>
        
             {/* 图片3 */}
             <div className="animate-float animate-seesaw-3 w-12 h-12 md:w-20 md:h-20 rounded-lg shadow-lg overflow-hidden">
             <img 
                src="src\pictures\3.jpg" 
                className="w-full h-full object-cover"
              />
             </div>
        
              <div className="animate-float animate-seesaw-4 w-12 h-12 md:w-20 md:h-20 rounded-lg shadow-lg overflow-hidden">
             <img 
                src="src\pictures\4.jpg" 
                className="w-full h-full object-cover"
             />
             </div>
             </div>
            <style jsx global>{
            /* 浮动动画 */
            `  
            /* 跷跷板动画 - 每个图片有不同的相位 */
            .animate-seesaw-1 {
              animation: seesaw 4s ease-in-out infinite;
            }
            
            .animate-seesaw-2 {
              animation: seesaw 4s ease-in-out 0.5s infinite;
            }
            
            .animate-seesaw-3 {
              animation: seesaw 4s ease-in-out 1s infinite;
            }
            
            .animate-seesaw-4 {
              animation: seesaw 4s ease-in-out 1.5s infinite;
            }
            
            @keyframes seesaw {
              0% { transform: rotate(-5deg); }
              50% { transform: rotate(5deg); }
              100% { transform: rotate(-5deg); }
            }
            `}</style>  
            <h1 className="text-5xl lg:text-6xl font-bold text-black mb-4">
              Powering Your Portfolio
            </h1>
            <p className="text-lg lg:text-xl text-gray-700 mb-10 max-w-2xl">
              Track real-time stock prices and manage your investments with ease.
            </p>
            <button
              onClick={handleGetStarted}
              className="bg-brand-primary text-white px-8 py-3 rounded-full text-lg font-body-bold hover:bg-brand-700 transition shadow-lg"
            >
              Get started
            </button>
          </div>
        </SwiperSlide>

        {/* Slide 2 - View Stocks */}
        <SwiperSlide>
      
          <div className="h-screen flex flex-col items-center justify-center text-center px-6">
            <h2 className="text-heading-1 text-brand-primary mb-4">
              View Stock Prices
            </h2>
            <p className="text-body text-gray-700 max-w-xl">
              Get real-time updates on market trends and stock performance.
            </p>
            <img
              src="/assets/stocks-example.png"
              alt="Stock Preview"
              className="mt-8 max-w-md w-full rounded-lg shadow-lg"
            />
          </div>
        </SwiperSlide>

        {/* Slide 3 - Portfolio */}
        <SwiperSlide>
          <div className="h-screen flex flex-col items-center justify-center text-center px-6">
            <h2 className="text-heading-1 text-brand-primary mb-4">
              Manage Your Portfolio
            </h2>
            <p className="text-body text-gray-700 max-w-xl">
              Select your favorite stocks and let the system track your portfolio performance.
            </p>
            <img
              src="/assets/portfolio-example.png"
              alt="Portfolio Preview"
              className="mt-8 max-w-md w-full rounded-lg shadow-lg"
            />
          </div>
        </SwiperSlide>
      </Swiper>
      {/* 🎨 动画样式 - 新增内容 */}
    
    </div>
  );
};

export default Homepage;
