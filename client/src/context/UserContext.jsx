import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

const UserContext = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userFromLS = JSON.parse(localStorage.getItem("user"));
    const JWT = localStorage.getItem("JWT");

    if (userFromLS && JWT) {
      setUser(userFromLS);
    }
  }, []);

  const contextValue = {
    user,
    setUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export { UserContext, ContextProvider };
