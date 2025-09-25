import React, { useState } from "react";
import { IoMdHome } from "react-icons/io";
import Button from "./Button";
import { IoMdRefreshCircle } from "react-icons/io";
import { useNavigate } from "react-router";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Modal from "./Modal";
import Input from "./Input";

const MiniHeader = ({ selected, setSelected, getDocuments, getDocs }) => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [doc, setDoc] = useState({ name: "" });

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
      if (error?.response?.data?.message == "Invalid or expired token") {
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

  const openEditModal = () => {
    const selectedDoc = getDocs.find((d) => d._id === selected[0]);
    if (!selectedDoc) return toast.error("Document not found");

    // ✅ Split name into baseName and extension
    const lastDotIndex = selectedDoc.name.lastIndexOf(".");
    const baseName =
      lastDotIndex !== -1
        ? selectedDoc.name.slice(0, lastDotIndex)
        : selectedDoc.name;
    const extension =
      lastDotIndex !== -1 ? selectedDoc.name.slice(lastDotIndex) : "";

    setDoc({ baseName, extension });
    setIsEditModalOpen(true);
  };

  const editFileName = async () => {
    try {
      const selectedDoc = getDocs.find((doc) => doc._id === selected[0]);
      if (!selectedDoc) return toast.error("Document not found");

      const updatedName = `${doc.baseName}${doc.extension}`;

      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/docs/${selectedDoc._id}`,
        {
          name: updatedName,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("JWT")}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setTimeout(() => {
          getDocuments();
        }, 1000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error?.response?.data?.message == "Invalid or expired token") {
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
    setIsDeleteModalOpen(false);
  };

  const handleEdit = () => {
    editFileName();
    setIsEditModalOpen(false);
  };

  return (
    <div className="flex justify-between items-center px-3 md:px-10 py-2 border-b-1 border-gray-300">
      <p
        className="flex justify-between items-center gap-1 md:gap-2 text-gray-600 cursor-pointer hover:text-gray-700"
        onClick={() => navigate("/")}
      >
        <IoMdHome className="text-lg" />
        <span className="text-sm">Home</span>
      </p>
      <div className="flex gap-1 md:gap-2 items-center">
        <IoMdRefreshCircle
          className="font-bold text-2xl md:mr-1 text-gray-700 cursor-pointer"
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
          onclick={() => setIsDeleteModalOpen(true)}
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
          onclick={openEditModal}
        />
      </div>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <div className="flex flex-col gap-3 px-2 md:py-3 md:px-4">
          <h4 className="text-center font-bold text-gray-800">
            Are you sure you want to delete this document?
          </h4>
          <p className="text-center font-medium text-gray-600 text-sm">
            This action cannot be undone and the file will be permanently
            removed from your account.
          </p>
          <div className="flex justify-end gap-3 mt-2 md:mr-3">
            <Button
              btnText={"Cancle"}
              btnSize={"medium"}
              variant={"outline"}
              className={"cursor-pointer"}
              onclick={() => setIsDeleteModalOpen(false)}
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
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <div className="flex flex-col gap-3 px-2 md:py-3 md:px-4">
          <h4 className="text-center font-bold text-gray-800">
            Edit Document Name
          </h4>
          <p className="text-center font-medium text-gray-600 text-sm">
            You can rename your document below. Make sure the name is
            descriptive.
          </p>
          <Input
            type={"text"}
            placeholder={"Doc Name"}
            value={doc.baseName}
            onChange={(e) => setDoc({ ...doc, baseName: e.target.value })}
          />
          <div className="flex justify-end gap-3 mt-2">
            <Button
              btnText={"Cancle"}
              btnSize={"medium"}
              variant={"outline"}
              className={"cursor-pointer"}
              onclick={() => setIsEditModalOpen(false)}
            />
            <Button
              btnText={"Edit"}
              btnSize={"medium"}
              variant={"blue"}
              onclick={handleEdit}
            />
          </div>
        </div>
      </Modal>
      <Toaster />
    </div>
  );
};

export default MiniHeader;
