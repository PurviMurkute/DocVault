import { CgLogIn } from "react-icons/cg";
import { MdStart } from "react-icons/md";

const Button = ({ btnText, icon, variant, btnSize, onclick }) => {
  const icons = {
    login: <CgLogIn className="text-xl font-bold" />,
    "get started": <MdStart className="text-2xl" />,
  };

  const variants = {
    red: "bg-[#ff1a1a]",
    blue: "bg-[#0073e6]",
    black: "bg-gray-800"
  };

  const btnSizes = {
    "large": "px-9 py-3 rounded-lg",
    "medium": "px-5 py-1 rounded-full",
    "small": "py-2 w-[85%] mx-auto my-3 rounded-lg"
  }

  return (
    <button className={`${variants[variant]} ${btnSizes[btnSize]} text-white font-medium justify-center flex items-center gap-1 cursor-pointer`} onClick={onclick}>
      {btnText} {icon ? icons[icon] : null}
    </button>
  );
};

export default Button;
