import axios from "axios";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import { LuLoaderCircle } from "react-icons/lu";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const GoogleLogin = () => {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (token) {
        localStorage.setItem("JWT", token);

        try {
          const res = await axios.get(
            `${import.meta.env.VITE_SERVER_URL}/current-user`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (res.data.success) {
            setUser(res.data.data);
            localStorage.setItem("user", JSON.stringify(res.data.data));
            toast.success("Login Successful");
            setTimeout(() => {
              navigate("/dashboard");
            }, 2000);
          }
        } catch (error) {
          console.log("error in googlesuccess", error);

          toast.error(error?.message);
        }
      }
    };

    handleAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center h-screen space-y-4">
      <LuLoaderCircle className="w-8 h-8 animate-spin"/>
      <p className="font-medium">Logging you in...</p>
      <Toaster />
    </div>
  );
};

export default GoogleLogin;