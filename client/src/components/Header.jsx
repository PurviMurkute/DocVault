import React, { useContext } from "react";
import logo from "../assets/pages.png";
import Button from "./Button";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";
import toast, { Toaster } from "react-hot-toast";

const Header = ({ onUploadOnclick }) => {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const isDashboard = location.pathname.startsWith('/dashboard');

  const handleLogOut = () => {
    localStorage.removeItem("JWT");
    localStorage.removeItem("user");
    toast.success("LogOut successfully");
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <div className={` ${isDashboard? "w-full px-10 py-4": "w-[95%] md:w-[75%] lg:w-[55%] rounded-full m-1 px-5 py-2"} bg-gray-900 z-10 sticky top-0 mx-auto`}>
      <div className="flex justify-between items-center">
        <Link to="/" className="text-white flex items-center gap-2 ">
          <img src={logo} alt="logo" className="w-[30px]" />
          <p className="text-2xl font-medium font-serif">DocVault</p>
        </Link>
        {!user ? (
          <Button
            btnText="Login"
            icon="login"
            variant="blue"
            btnSize="medium"
            onclick={() => navigate("/login")}
          />
        ) : (
          <div className="flex gap-4">
          <Button
            btnText={"Upload"}
            btnSize={"medium"}
            variant={"blue"}
            icon={"upload"}
            onclick={onUploadOnclick}
          />
          <Button
            btnText={"LogOut"}
            icon={"login"}
            variant={"red"}
            btnSize={"medium"}
            onclick={handleLogOut}
          />
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default Header;
