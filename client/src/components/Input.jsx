import React from "react";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";

const Input = ({
  type,
  placeholder,
  value,
  onChange,
  passwordInput,
  showPass,
  setShowPass,
}) => {
  const togglePass = () => {
    setShowPass(!showPass);
  };

  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <div className="relative">
      {passwordInput ? (
        <span
          onClick={togglePass}
          className="absolute right-7 md:right-11 mt-9 transform -translate-y-1/2 text-gray-500 cursor-pointer"
        >
          {showPass ? (
            <GoEye className="w-5 h-4" />
          ) : (
            <GoEyeClosed className="w-5 h-4" />
          )}
        </span>
      ) : null}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${
          isDashboard
            ? "w-[100%] my-2 px-3 py-[5px]"
            : "w-[90%] md:w-[85%] shadow-lg rounded-md my-4 p-2"
        } bg-white border-1 border-gray-300 block mx-auto focus:outline-none `}
      />
    </div>
  );
};

export default Input;
