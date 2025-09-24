import React from "react";
import { IoMdHome } from "react-icons/io";
import Button from "./Button";
import { IoMdRefreshCircle } from "react-icons/io";
import { useNavigate } from "react-router";

const MiniHeader = ({ selected }) => {
    const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center px-10 py-2 border-b-1 border-gray-300">
      <p className="flex justify-between items-center gap-2 text-gray-600 cursor-pointer hover:text-gray-700" onClick={()=> navigate('/')}>
        <IoMdHome className="text-lg" />
        <span className="text-sm">Home</span>
      </p>
      <div className="flex gap-2 items-center">
        <IoMdRefreshCircle className="font-bold text-2xl mr-1 text-gray-700" onClick={()=> window.location.reload()} />
        <Button
          btnText={"Delete"}
          btnSize={"roundfull"}
          variant={"outline"}
          className={`${
            !selected || selected.length === 0
              ? "cursor-not-allowed"
              : "cursor-pointer border-red-700 text-red-600"
          }`}
        />
        <Button btnText={"Edit"} btnSize={"roundfull"} variant={"outline"} className={`${
            !selected || selected.length === 0 || selected.length > 1
              ? "cursor-not-allowed"
              : "cursor-pointer border-green-700 text-green-600"
          }`} />
      </div>
    </div>
  );
};

export default MiniHeader;
