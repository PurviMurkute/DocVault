import React, { useState } from "react";
import { IoMdHome } from "react-icons/io";
import Button from "./Button";
import { IoMdRefreshCircle } from "react-icons/io";
import { useNavigate } from "react-router";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Modal from "./Modal";

const MiniHeader = ({ selected, setSelected, getDocuments }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const deleteFile = async () => {
    try {
      await selected.map((id) =>
        axios.delete(`${import.meta.env.VITE_SERVER_URL}/docs/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("JWT")}`,
          },
        })
      );

      await getDocuments();
      toast.success(`${selected.length} document(s) deleted ✅`);
      setSelected([]);
    } catch (error) {
      if (error?.response?.data?.message == "jwt expired") {
        localStorage.removeItem("JWT");
        localStorage.removeItem("user");
        toast.error("JWT expired, please signin again");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        return;
      }
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const handleDelete = () => {
    deleteFile();
    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-between items-center px-10 py-2 border-b-1 border-gray-300">
      <p
        className="flex justify-between items-center gap-2 text-gray-600 cursor-pointer hover:text-gray-700"
        onClick={() => navigate("/")}
      >
        <IoMdHome className="text-lg" />
        <span className="text-sm">Home</span>
      </p>
      <div className="flex gap-2 items-center">
        <IoMdRefreshCircle
          className="font-bold text-2xl mr-1 text-gray-700 cursor-pointer"
          onClick={() => window.location.reload()}
        />
        <Button
          btnText={"Delete"}
          btnSize={"roundfull"}
          variant={"outline"}
          className={`${
            !selected || selected.length === 0
              ? "cursor-not-allowed"
              : "cursor-pointer border-red-700 text-red-600"
          }`}
          onclick={() => setIsModalOpen(true)}
        />
        <Button
          btnText={"Edit"}
          btnSize={"roundfull"}
          variant={"outline"}
          className={`${
            !selected || selected.length === 0 || selected.length > 1
              ? "cursor-not-allowed"
              : "cursor-pointer border-green-700 text-green-600"
          }`}
        />
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col gap-3 py-3 px-7">
          <h4 className="text-center font-bold text-gray-800">
            Are you sure you want to delete this document?
          </h4>
          <p className="text-center font-medium text-gray-600 text-sm">
            This action cannot be undone and the file will be permanently
            removed from your account.
          </p>
          <div className="flex justify-end gap-3 mt-2">
            <Button
              btnText={"Cancle"}
              btnSize={"medium"}
              variant={"outline"}
              className={"cursor-pointer"}
              onclick={() => setIsModalOpen(false)}
            />
            <Button
              btnText={"Delete"}
              btnSize={"medium"}
              variant={"red"}
              onclick={handleDelete}
            />
          </div>
        </div>
      </Modal>
      <Toaster />
    </div>
  );
};

export default MiniHeader;
