import React from "react";

const WorkflowSection = ({
  step,
  title,
  text,
  laptopImg,
  phoneImg,
  reverse,
}) => {
  return (
    <div
      className={`flex flex-col ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      } items-center justify-center gap-10 mt-10 py-10 md:py-20 
      bg-gradient-to-l from-white via-${step}-50 to-transparent`}
    >
      <div className="relative w-full md:w-[50%] flex justify-center">
        <img
          src={laptopImg}
          alt="Laptop Screen"
          className="w-[90%] max-w-[600px] rounded-2xl shadow-xl"
        />
        <img
          src={phoneImg}
          alt="Phone Screen"
          className={`absolute bottom-[-20px] ${
            reverse ? "left-5 md:left-20" : "right-5 md:right-10"
          } w-[120px] h-[220px] md:w-[180px] md:h-[300px] object-contain bg-white rounded-xl shadow-xl border-4 border-white`}
        />
      </div>
      <div className="w-full md:w-[40%] text-center md:text-left px-5">
        <h3 className="text-xl md:text-2xl font-bold text-gray-700 mb-3">
          {title}
        </h3>
        <p className="text-gray-700 leading-relaxed text-sm md:text-base">
          {text}
        </p>
      </div>
    </div>
  );
};

export default WorkflowSection;
