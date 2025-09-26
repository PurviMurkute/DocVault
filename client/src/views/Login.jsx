import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";
import Input from "../components/Input";
import Button from "../components/Button";
import axios from "axios";

const Login = () => {
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  const login = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/login`,
        {
          email: loginUser.email,
          password: loginUser.password,
        }
      );
      console.log(response.data);

      if (response.data.success) {
        toast.success(response.data.message);
        setLoginUser(response.data.data);
        setUser(response.data.data);
        localStorage.setItem("JWT", response.data.jwtToken);
        localStorage.setItem("user", JSON.stringify(response.data.data));
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
        setLoginUser({
          email: "",
          password: "",
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      toast.loading(
        "Please wait, This might take a few seconds, or this may take longer than usual if the server is waking up."
      );
    } else {
      toast.dismiss();
    }
  }, [loading]);

  return (
    <div className="min-h-screen relative">
      <Header />
      <div className="flex justify-center items-center absolute inset-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="bg-gradient-to-b from-purple-200 via-pink-200 to-blue-200 w-full md:w-[400px] flex flex-col justify-center py-15 px-5 rounded-md shadow-md"
        >
          <h5 className="font-bold text-center text-gray-700 mb-2 text-lg">
            Welcome Back to DocVault
          </h5>
          <p className="font-medium text-center text-gray-600 px-5 text-sm">
            Securely access your stored documents anytime, anywhere.
          </p>
          <Button
            btnText={"Login with Google"}
            btnSize={"small"}
            variant={"outline"}
            icon={"google"}
            iconPosition={"left"}
          />
          <div className="flex items-center w-[90%] mx-auto my-2">
            <div className="h-[1px] flex-1 bg-gray-500" />
            <span className="mx-3 text-sm text-gray-500">OR</span>
            <div className="h-[1px] flex-1 bg-gray-500" />
          </div>
          <Input
            type="text"
            placeholder="Email"
            value={loginUser.email}
            onChange={(e) => {
              setLoginUser({ ...loginUser, email: e.target.value });
            }}
          />
          <Input
            type="password"
            placeholder="Password"
            value={loginUser.password}
            onChange={(e) => {
              setLoginUser({ ...loginUser, password: e.target.value });
            }}
          />
          <Button
            btnText="Login"
            btnSize="small"
            icon="login"
            iconPosition={"right"}
            variant="black"
            onclick={login}
          />
          <p className="text-center font-medium text-gray-800 py-2 text-[15px]">
            Don't have an accout?{" "}
            <Link to={"/register"} className="text-blue-600">
              Register now
            </Link>
          </p>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
