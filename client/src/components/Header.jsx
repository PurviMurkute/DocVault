import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/pages.png";
import Button from "./Button";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";
import toast, { Toaster } from "react-hot-toast";

const Header = ({ onUploadOnclick }) => {
  const navigate = useNavigate();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { user } = useContext(UserContext);

  const isDashboard = location.pathname.startsWith("/dashboard");

  const handleLogOut = () => {
    localStorage.removeItem("JWT");
    localStorage.removeItem("user");
    toast.success("LogOut successfully");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div
      className={`w-full px-3 md:px-10 py-3 bg-white border-b-1 border-gray-300 shadow z-10 fixed top-0`}
    >
      <div className="flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 ">
          <img src={logo} alt="logo" className="w-[30px]" />
          <p className="text-2xl font-bold font-serif">DocVault</p>
        </Link>
        {!user ? (
          <Button
            btnText="Login"
            icon="login"
            variant="red"
            btnSize="medium"
            onclick={() => navigate("/login")}
          />
        ) : (
          <div className="flex gap-4">
            {isDashboard ? (
              <Button
                btnText={`${isDesktop? "Upload": "" }`}
                btnSize={"medium"}
                variant={"blue"}
                icon={"upload"}
                onclick={onUploadOnclick}
              />
            ) : null}
            <Button
              btnText={`${isDesktop? "LogOut" : ""}`}
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