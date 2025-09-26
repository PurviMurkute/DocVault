import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";

const UserContext = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  
const handleLogOut = () => {
    localStorage.removeItem("JWT");
    localStorage.removeItem("user");
    setUser(null);
    toast.success("LogOut successfully");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  useEffect(() => {
    const userFromLS = JSON.parse(localStorage.getItem("user"));
    const JWT = localStorage.getItem("JWT");

    if (userFromLS && JWT) {
      setUser(userFromLS);
    }else{
      setUser(null);
    }
  }, []);

  const contextValue = {
    user,
    setUser,
    handleLogOut
  };

  return (
    <UserContext.Provider value={contextValue}>{children}<Toaster/></UserContext.Provider>
  );
};

export { UserContext, ContextProvider };
