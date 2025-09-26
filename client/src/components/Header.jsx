import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/pages.png";
import Button from "./Button";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";
import toast, { Toaster } from "react-hot-toast";
import { Link as ScrollLink } from 'react-scroll'

const Header = () => {
  const navigate = useNavigate();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { user, handleLogOut } = useContext(UserContext);
  
  const isHomePage = window.location.pathname === "/";


  return (
    <div
      className={`w-full px-3 md:px-10 py-3 bg-white border-b-1 border-gray-300 shadow z-10 fixed top-0`}
    >
      <div className="flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 ">
          <img src={logo} alt="logo" className="w-[30px]" />
          <p className="text-xl md:text-2xl font-bold font-serif">DocVault</p>
        </Link>
        <div className={`${isHomePage? "hidden md:flex": "hidden"} justify-between items-center gap-8 text-gray-700 text-md font-medium mt-1`}>
          <ScrollLink to="home" smooth={true} duration={500} className="cursor-pointer">Home</ScrollLink>
          <ScrollLink to="features" smooth={true} duration={500} className="cursor-pointer">Features</ScrollLink>
          <ScrollLink to="workflow" smooth={true} duration={500} className="cursor-pointer">Workflow</ScrollLink>
          <ScrollLink to="reviews" smooth={true} duration={500} className="cursor-pointer">Reviews</ScrollLink>
        </div>
        {!user ? (
          <Button
            btnText="Login"
            icon="login"
            iconPosition={"right"}
            variant="red"
            btnSize="medium"
            onclick={() => navigate("/login")}
          />
        ) : (
            <Button
              btnText={`${isDesktop? "LogOut" : ""}`}
              icon={"login"}
              iconPosition={"right"}
              variant={"red"}
              btnSize={"medium"}
              onclick={handleLogOut}
            />
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default Header;