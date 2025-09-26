import React from "react";
import { EyeOff, Eye } from "lucide-react";

const Input = ({ type, placeholder, value, onChange, passwordInput, showPass, setShowPass }) => {

  const togglePass = () => {
    setShowPass(!showPass);
  };

  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <div className="relative">
    {passwordInput? (<span
        onClick={togglePass}
        className="absolute right-5 md:right-14 mt-5 transform -translate-y-1/2 text-gray-500 cursor-pointer"
      >
        {showPass ? (
          <Eye className="w-5 h-4" />
        ) : (
          <EyeOff className="w-5 h-4" />
        )}
      </span>): null}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${isDashboard? "w-[100%] my-2 px-3 py-[5px]": "w-[90%] md:w-[85%] shadow-lg rounded-md my-4 p-2" } bg-white border-1 border-gray-300 block mx-auto focus:outline-none `}
      />
    </div>
  );
};

export default Input;
