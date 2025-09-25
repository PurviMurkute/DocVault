import React from "react";
import logo from "../assets/pages.png";
import { Link } from "react-router";
import { MdMail, MdAddIcCall, MdLocationPin } from "react-icons/md";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { Link as ScrollLink } from "react-scroll";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between gap-8 px-5 md:px-20">
        <div className="flex flex-col gap-3 md:w-[500px]">
          <div className="flex items-center gap-2">
            <img src={logo} alt="logo" className="w-8 md:w-10" />
            <span className="text-2xl font-bold font-serif">DocVault</span>
          </div>
          <p className="text-gray-300">
            Securely store all your important documents, images, and files.
            Access them anytime, anywhere.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="#" className="hover:text-blue-400 transition-colors">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              <FaLinkedinIn />
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              <FaInstagram />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2 md:w-[350px]">
          <h4 className="font-bold text-white mb-2">Quick Links</h4>
          <ScrollLink
            to="home"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-blue-400 transition-colors"
          >
            Home
          </ScrollLink>
          <ScrollLink
            to="features"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-blue-400 transition-colors"
          >
            Features
          </ScrollLink>
          <ScrollLink
            to="workflow"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-blue-400 transition-colors"
          >
            Workflow
          </ScrollLink>
          <ScrollLink
            to="reviews"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-blue-400 transition-colors"
          >
            Reviews
          </ScrollLink>
        </div>

        <div className="flex flex-col gap-2 md:w-[350px]">
          <h4 className="font-bold text-white mb-2">Contact Us</h4>
          <a
            href="mailto:dev.purvim@gmail.com"
            className="flex items-center gap-2 hover:text-blue-400 transition-colors"
          >
            <MdMail /> <span>dev.purvim@gmail.com</span>
          </a>
          <a
            href="tel:+914365769877"
            className="flex items-center gap-2 hover:text-blue-400 transition-colors"
          >
            <MdAddIcCall /> <span>+91 8080XXXXXX</span>
          </a>
          <div className="flex items-center gap-2 text-gray-300">
            <MdLocationPin /> <span>Mumbai, 444444</span>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8"></div>
      <div className="text-center text-gray-500 text-sm mt-4">
        &copy; {new Date().getFullYear()} DocVault. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
