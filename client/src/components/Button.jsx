import { CgLogIn } from "react-icons/cg";
import { MdStart } from "react-icons/md";
import { MdOutlineCloudUpload } from "react-icons/md";

const Button = ({ btnText, icon, variant, btnSize, onclick, className }) => {
  const icons = {
    login: <CgLogIn className="text-xl font-bold" />,
    "get started": <MdStart className="text-2xl" />,
    "upload": <MdOutlineCloudUpload className="text-xl font-bold" />
  };

  const variants = {
    red: "bg-[#ff1a1a] text-white cursor-pointer",
    blue: "bg-[#026ed9] text-white cursor-pointer",
    black: "bg-gray-800 text-white cursor-pointer",
    outline: "border-1 border-gray-500 text-gray-600 w-[80px] text-xs"
  };

  const btnSizes = {
    large: "px-9 py-3 rounded-lg",
    medium: "px-5 py-2 rounded-lg",
    roundfull: "px-5 py-1 rounded-full",
    small: "py-2 w-[85%] mx-auto my-3 rounded-lg",
  };

  return (
    <button
      className={`${variants[variant]} ${btnSizes[btnSize]} ${className} text-sm font-medium justify-center flex items-center gap-1 hover:scale-95 transition-transform duration-100`}
      onClick={onclick}
    >
      {btnText} {icon ? icons[icon] : null}
    </button>
  );
};

export default Button;
