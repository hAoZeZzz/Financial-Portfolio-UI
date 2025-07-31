// Homepage.jsx
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import StockChartEcharts from "./components/StockChartEcharts";
import portfolioImage from "./assets/IMG_0517.jpg";
import "swiper/css";

const Homepage = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false); // Slide2
  const [slide3Flipped, setSlide3Flipped] = useState(false); // Slide3
  const [slide3Locked, setSlide3Locked] = useState(false); // 控制按钮失效

  const handleGetStarted = () => {
    navigate("/dashboard");
  };

  return (
    <div className="relative h-screen w-screen text-neutral-0 font-body overflow-hidden">
      {/* 背景模糊色块 */}
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
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.activeIndex);
          if (swiper.activeIndex !== 2) {
            setSlide3Flipped(false); // 离开 Slide3 时重置状态
            setSlide3Locked(false);
          }
        }}
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
              <h1 className="text-6xl lg:text-6xl font-bold text-black mb-4">
                Powering Your Portfolio
              </h1>
              <p className="text-lg lg:text-xl text-gray-700 mb-10 max-w-2xl">
                Real-time Stock Prices Visualization｜ Investments Management
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
          <div className="h-screen flex items-center justify-center px-6 max-w-7xl mx-auto space-x-12">
            <div className="flex-1 max-w-lg">
              <h2 className="text-5xl font-bold text-brand-500 mb-4">
                View Stock Prices
              </h2>
              <p className="text-xl text-gray-700 mb-6">
                Get real-time updates on market trends and stock performance.
              </p>
              <button
                onClick={() => setIsFlipped(!isFlipped)}
                className="bg-brand-primary text-white px-8 py-3 rounded-full hover:bg-brand-700 transition shadow-lg"
              >
                {isFlipped ? "Show Chart" : "Learn More"}
              </button>
            </div>

            <div className="relative flex-1 w-2/3 h-[30rem]" style={{ perspective: 1000 }}>
              <div
                className="relative w-full h-full transition-transform duration-700"
                style={{
                  transformStyle: "preserve-3d",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* 正面图表 */}
                <div
                  className="absolute w-full h-full"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  {activeIndex === 1 && <StockChartEcharts />}
                </div>

                {/* 背面文本 */}
                <div
                  className="absolute w-full h-full flex items-center justify-center p-10 bg-emerald-50 rounded-xl"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <div className="text-[#374151] text-left space-y-6 max-w-xl">
                    <h3 className="text-3xl font-bold text-brand-500">What we provide?</h3>
                    <ul className="list-decimal list-inside space-y-3 text-lg leading-relaxed text-[#1f2937]">
                      <li>
                        <span className="font-semibold text-brand-600">Live 5-Minute Candlestick Charts:</span> Stay updated with real-time 5-minute K-line (candlestick) data for accurate short-term market tracking.
                      </li>
                      <li>
                        <span className="font-semibold text-brand-600">Clear Visual Analysis:</span> Instantly visualize price trends, fluctuations, and trading patterns through dynamic interactive charts.
                      </li>
                      <li>
                        <span className="font-semibold text-brand-600">Historical Reference with Previous Close:</span> Compare real-time movements against the previous day’s closing price to assess market momentum and sentiment.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 - Portfolio */}
        <SwiperSlide>
          <div className="h-screen flex items-center justify-center px-6 max-w-7xl mx-auto space-x-12">
            {/* 左侧文本 */}
            <div className="flex-1 max-w-lg">
              <h2 className="text-5xl font-bold text-brand-500 mb-6">
                Your Stocks. Your Way
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                Pick the stocks you care about, group them together, and see how your portfolio performs over time.
              </p>

              <button
                onClick={() => {
                  if (!slide3Locked) {
                    setSlide3Flipped(true);
                    setSlide3Locked(true);
                  }
                }}
                className={`mt-2 px-6 py-3 rounded-xl transition 
                  ${slide3Locked ? "bg-gray-400 cursor-not-allowed" : "bg-brand-500 hover:bg-brand-600"} 
                  text-white`}
              >
                Learn More
              </button>
            </div>

            {/* 右侧图/文本翻转区 */}
            <div className="flex-1" style={{ perspective: 1000 }}>
              <div
                className="relative w-full h-[360px] transition-transform duration-700"
                style={{
                  transformStyle: "preserve-3d",
                  transform: slide3Flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* 正面：图片 */}
                <div
                  className="absolute w-full h-full"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <img
                    src={portfolioImage}
                    alt="Portfolio Preview"
                    className="w-full h-full object-cover rounded-3xl"
                  />
                </div>

                {/* 背面：文本内容 */}
                <div
                  className="absolute w-full h-full flex items-center justify-center p-10 bg-emerald-50 rounded-xl"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <div className="text-[#374151] text-left space-y-8 max-w-xl">
                    <h3 className="text-4xl font-bold text-brand-500">What You Can Do?</h3>
                    <ul className="list-decimal list-inside space-y-6 text-xl leading-relaxed text-[#1f2937]">
                      <li>
                        <span className="font-bold text-gray-700">Select multiple stocks to form a custom portfolio</span>
                      </li>
                      <li>
                        <span className="font-bold text-gray-700">Update portfolio composition in real time</span>
                      </li>
                      <li>
                        <span className="font-bold text-gray-700">Track combined performance over time</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      {/* 🎨 动画样式 - 新增内容 */}

    </div>
  );
};

export default Homepage;
