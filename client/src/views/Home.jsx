import React, { useContext } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";
import features from "../config/Features";
import FeatureCard from "../components/FeatureCard";
import Reviews from "../config/Reviews";
import ReviewCard from "../components/ReviewCard";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const handliNavigate = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  return (
    <>
      <div className="min-h-screen w-full bg-white relative">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
        linear-gradient(to right, #f2f2f2 1px, transparent 1px),
        linear-gradient(to bottom, #f2f2f2 1px, transparent 1px)
      `,
            backgroundSize: "20px 20px",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
          }}
        />
        <Header />
        <div name="home" className="flex flex-col md:flex-row justify-evenly items-center inset-0 w-full md:w-[95%] md:min-h-screen absolute mx-auto mt-20 md:mt-0">
          <div className="flex flex-col gap-4 md:gap-7 lg:w-[32%] px-10 md:px-0">
            <p className="text-lg font-serif text-center md:text-left">DocVault!</p>
            <h1 className="text-gray-900 font-bold text-center md:text-left text-3xl md:text-4xl">
              Securely Store and Access All Your Files Anytime, Anywhere.
            </h1>
            <h4 className=" text-gray-600 text-sm md:text-[15px] text-center md:text-left">
              Upload your important files, certificates, PDFs, and images with
              complete security. Access them from anywhere, anytime - safely
              stored with end-to-end encryption using{" "}
              <span className="text-blue-500 text-lg">ImageKit</span>{" "}
              CDN.
            </h4>
            <div className="block md:flex mx-auto md:mx-0">
              <Button
                btnText="Get Started"
                icon="get started"
                variant="blue"
                btnSize="large"
                onclick={handliNavigate}
              />
            </div>
          </div>
          <div>
            <img src="/homeimg.png" alt="img" className="w-[300px] md:w-[480px]" />
          </div>
        </div>
      </div>
      <div name="features" className="md:px-30 pt-18 md:pt-3">
        <h4 className="font-bold text-center text-gray-700 text-xl md:text-2xl">Features of DocVault</h4>
        <div className="flex flex-wrap justify-center md:gap-5 py-10">
          {features.map((feature, i)=>{
            const { title, description, icon} = feature;

            return(
              <FeatureCard key={i} title={title} description={description} icon={icon} />
            )
          })}
        </div>
      </div>
      {/* <div className="md:px-30 pt-18 md:pt-3">
        <h4 className="font-bold text-center text-gray-700 text-xl md:text-2xl">Workflow</h4>
      </div> */}
      <div name="reviews" className="px-5 md:px-30 pt-3">
        <h4 className="font-bold text-center text-gray-700 text-xl md:text-2xl">Your Experience, Our Pride</h4>
        <p className="text-center text-gray-600 pt-1">Here’s what our users think about using DocVault to securely store their files.</p>
        <div className="flex gap-4 py-10 md:py-15 overflow-x-auto whitespace-nowrap scrollbar-hide">
          {Reviews.map((review, i)=>{
            const {image, name, text, ratings} = review;

            return(
              <ReviewCard key={i} image={image} name={name} text={text} ratings={ratings} />
            )
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
