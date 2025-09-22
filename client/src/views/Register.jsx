import React from "react";
import Header from "../components/Header";
import Input from "../components/Input";
import Button from "../components/Button";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router";

const Register = () => {
  const [registerUser, setRegisterUser] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const register = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/register`,
        {
          fullname: registerUser.fullname,
          email: registerUser.email,
          password: registerUser.password,
        }
      );

      if (response.data.success) {
        setRegisterUser(response.data.data);
        toast.success(response.data.message);
        setRegisterUser({
          fullname: "",
          email: "",
          password: "",
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  return (
    <div className="min-h-screen relative">
      <Header />
      <div className="flex justify-center items-center absolute inset-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="bg-gradient-to-b from-purple-200 via-pink-200 to-blue-200 w-[450px] flex flex-col justify-center py-15 px-5 rounded-md shadow-md"
        >
          <h5 className="font-bold text-center text-gray-700 mb-2 text-lg">
            Create Your Free DocVault Account
          </h5>
          <p className="font-medium text-center text-gray-600 px-5 text-sm">
            Start uploading and organizing your important files in a secure,
            private cloud vault.
          </p>
          <Input
            type="text"
            placeholder="FullName"
            value={registerUser.fullname}
            onChange={(e) => {
              setRegisterUser({ ...registerUser, fullname: e.target.value });
            }}
          />
          <Input
            type="text"
            placeholder="Email"
            value={registerUser.email}
            onChange={(e) => {
              setRegisterUser({ ...registerUser, email: e.target.value });
            }}
          />
          <Input
            type="password"
            placeholder="Password"
            value={registerUser.password}
            onChange={(e) => {
              setRegisterUser({ ...registerUser, password: e.target.value });
            }}
          />
          <Button
            btnText="Register"
            btnSize="small"
            icon="login"
            variant="black"
            onclick={register}
          />
          <p className="text-center font-bold text-gray-800 py-2">
            Already have an account?{" "}
            <Link to={"/login"} className="text-blue-600">
              Login now
            </Link>
          </p>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default Register;
