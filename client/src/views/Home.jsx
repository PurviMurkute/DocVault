import React, { useContext } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";

const Home = () => {
    const navigate = useNavigate();

    const { user } = useContext(UserContext);

    const handliNavigate = () => {
      if(user){
        navigate('/dashboard');
      }else{
        navigate('/register');
      }
    }

  return (
    <div className="min-h-screen">
      <div className="min-h-screen w-full bg-white relative">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
        linear-gradient(to right, #e2e8f0 1px, transparent 1px),
        linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
      `,
            backgroundSize: "20px 30px",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
          }}
        />
        <Header />
        <div className="flex flex-col gap-7 justify-center items-center inset-0 w-[95%] md:w-[70%] lg:w-[50%] h-[650px] absolute mx-auto">
          <h1 className="text-center bg-gradient-to-r from-purple-600 via-orange-400 to-blue-500 inline-block text-transparent bg-clip-text font-extrabold text-4xl">
            Your Digital Document Locker
          </h1>
          <h4 className="font-bold text-center text-gray-700 text-[17px]">
            Upload your important files, certificates, PDFs, and images with
            complete security. Access them from anywhere, anytime - safely
            stored with end-to-end encryption using <span className="text-purple-700 text-lg">ImageKit</span> CDN.
          </h4>
          <Button
            btnText="Get Started"
            icon="get started"
            variant="blue"
            btnSize="large"
            onclick={handliNavigate}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
