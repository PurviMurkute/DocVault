import logo from "../assets/pages.png";
import { Link, useNavigate } from "react-router";
import { IoMdCloseCircle } from "react-icons/io";
import Button from "./Button";
import { useState } from "react";
import { IoDocumentsSharp, IoTrashSharp } from "react-icons/io5";
import { IoMdImages } from "react-icons/io";
import { MdPictureAsPdf } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, onUploadOnclick }) => {
  return (
    <>
      <div
        className={`fixed top-0 left-0 min-h-screen w-[250px] bg-gray-800 text-gray-200 px-4 py-4 z-50 transform transition-transform duration-500 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col justify-between min-h-screen pb-5">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <Link to="/" className="flex items-center gap-1 ">
                <img src={logo} alt="logo" className="w-[25px]" />
                <p className="text-xl md:text-2xl font-medium font-serif">
                  DocVault
                </p>
              </Link>
              <IoMdCloseCircle
                className="text-gray-200 text-2xl cursor-pointer"
                onClick={() => setIsSidebarOpen(false)}
              />
            </div>
            <Button
              btnText={"Upload"}
              btnSize={"small"}
              variant={"lightOutline"}
              icon={"upload"}
              iconPosition={"left"}
              className={`cursor-pointer`}
              onclick={onUploadOnclick}
            />
            <hr className="text-gray-600" />
            <p className="flex items-center gap-2 font-medium py-1">
              <IoDocumentsSharp className="text-gray-300" />
              <span>All Docs</span>
            </p>
            <p className="flex items-center gap-2 font-medium py-1">
              <IoMdImages className="text-blue-400" />
              <span>Images</span>
            </p>
            <p className="flex items-center gap-2 font-medium py-1">
              <MdPictureAsPdf className="text-red-300" />
              <span>PDF's</span>
            </p>
            <p className="flex items-center gap-2 font-medium py-1">
              <IoTrashSharp className="text-red-400" />
              <span>Recently deleted</span>
            </p>
            <p className="flex items-center gap-2 font-medium py-1">
              <AiFillStar className="text-yellow-600" />
              <span>Important's</span>
            </p>
          </div>
          <div className="flex flex-col">
            <hr className="text-gray-600" />
            <Button
              btnText={"LogOut"}
              icon={"login"}
              iconPosition={"left"}
              className={"py-4 cursor-pointer"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
