import { Link, useLocation, useNavigate } from "react-router";
import { IoMdCloseCircle } from "react-icons/io";
import Button from "./Button";
import { useContext } from "react";
import { IoDocumentsSharp, IoTrashSharp } from "react-icons/io5";
import { IoMdImages } from "react-icons/io";
import { MdPictureAsPdf } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { UserContext } from "../context/UserContext";

const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  onUploadOnclick,
  closeSideBar,
  setSelectAll,
  setSelected
}) => {
  const { handleLogOut } = useContext(UserContext);

  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      icon: <IoDocumentsSharp className="text-gray-300" />,
      label: "All Docs",
      pathname: "/dashboard"
    },
    {
      icon: <IoMdImages className="text-blue-400" />,
      label: "Images",
      pathname: "/dashboard/images"
    },
    {
      icon: <MdPictureAsPdf className="text-red-300" />,
      label: "PDF's",
      pathname: "/dashboard/pdf's"
    },
    {
      icon: <IoTrashSharp className="text-red-400" />,
      label: "Trash",
      pathname: "/dashboard/trash"
    },
    {
      icon: <AiFillStar className="text-yellow-600" />,
      label: "Starred",
      pathname: "/dashboard/starred"
    },
  ];

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
                <img src={'/pages.png'} alt="logo" className="w-[25px]" />
                <p className="text-xl md:text-2xl font-medium font-serif">
                  DocVault
                </p>
              </Link>
              <IoMdCloseCircle
                className="block md:hidden text-gray-200 text-2xl cursor-pointer"
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
            <div className="flex flex-col gap-3">
              {menuItems.map((item, i) => (
                <p
                  key={i}
                  className={`${
                    location.pathname === item.pathname
                      ? "bg-gray-600"
                      : "text-gray-200"
                  } flex items-center gap-2 font-medium py-1 hover:bg-gray-600 rounded-lg cursor-pointer px-2 transition`}
                  onClick={() => {
                    navigate(item.pathname);
                    closeSideBar();
                    setSelectAll(false);
                    setSelected([]);
                  }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </p>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <hr className="text-gray-600" />
            <Button
              btnText={"LogOut"}
              icon={"login"}
              iconPosition={"left"}
              onclick={handleLogOut}
              className={"py-4 px-2 cursor-pointer rounded-md hover:bg-red-600"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
