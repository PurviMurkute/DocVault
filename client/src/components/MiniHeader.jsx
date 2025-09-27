import React, { useContext, useState } from "react";
import { IoMdHome } from "react-icons/io";
import Button from "./Button";
import { IoMdRefreshCircle } from "react-icons/io";
import { useNavigate } from "react-router";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Modal from "./Modal";
import Input from "./Input";
import { UserContext } from "../context/UserContext";
import { RiMenu4Fill } from "react-icons/ri";

const MiniHeader = ({
  selected,
  setSelected,
  getDocuments,
  getDocs,
  setGetDocs,
  isSidebarOpen,
  setIsSidebarOpen,
  selectAll,
  setSelectAll,
}) => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [doc, setDoc] = useState({ name: "" });

  const { setUser } = useContext(UserContext);

  const deleteFile = async () => {
    try {
      await Promise.all(
        selected.map((id) =>
          axios.delete(`${import.meta.env.VITE_SERVER_URL}/docs/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("JWT")}`,
            },
          })
        )
      );

      setGetDocs((prevDocs) =>
        prevDocs.filter((doc) => !selected.includes(doc._id))
      );

      setTimeout(() => {
        getDocuments();
      }, 1000);
      toast.success(`${selected.length} document(s) deleted ✅`);
      setSelected([]);
    } catch (error) {
      if (error?.response?.data?.message == "Invalid or expired token") {
        localStorage.removeItem("JWT");
        localStorage.removeItem("user");
        setUser(null);
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

    // Split name into baseName and extension
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
        setSelected([]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error?.response?.data?.message == "Invalid or expired token") {
        localStorage.removeItem("JWT");
        localStorage.removeItem("user");
        setUser(null);
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

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  const handleSelectAll = () => {
    if (selected.length === getDocs.length) {
      setSelected([]);
      setSelectAll(false);
    } else {
      setSelected(getDocs.map((doc) => doc._id));
      setSelectAll(true);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center px-2 md:px-5 py-2 border-b-1 border-gray-300">
        <div
          className={`flex items-center gap-1 ${
            isSidebarOpen ? "ps-5" : "ps-0"
          }`}
        >
          {isSidebarOpen ? null : (
            <RiMenu4Fill
              className="text-gray-600 text-xl cursor-pointer"
              onClick={() => setIsSidebarOpen(true)}
            />
          )}
          <p
            className="flex justify-between items-center gap-1 md:gap-2 text-gray-600 cursor-pointer hover:text-gray-700"
            onClick={() => navigate("/")}
          >
            <IoMdHome className="text-lg" />
            <span className="text-sm">Home</span>
          </p>
        </div>
        <div className="flex gap-1 md:gap-2 items-center">
          <IoMdRefreshCircle
            className="font-bold text-2xl md:mr-1 text-gray-700 cursor-pointer"
            onClick={() => window.location.reload()}
          />
          <Button
            btnText={"Delete"}
            btnSize={"roundfull"}
            variant={"outline"}
            className={`w-[80px] ${
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
            className={`w-[80px] ${
              !selected || selected.length === 0 || selected.length > 1
                ? "cursor-not-allowed"
                : "cursor-pointer border-green-700 text-green-600"
            }`}
            onclick={openEditModal}
          />
        </div>
      </div>
      <div className="flex justify-between items-center gap-5 px-2 md:px-5 border-b-1 border-gray-300">
        <div
          className={`${isSidebarOpen ? "ps-5" : "ps-0"} w-[70%]`}
        >
          <Input type={"text"} placeholder={`🔎 Search your docs here...`} />
        </div>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => {
            toggleSelectAll(), handleSelectAll();
          }}
        >
          <p
            className={`${
              selectAll
                ? "bg-blue-600 border-none"
                : "bg-white border-1 border-gray-500"
            } p-[6px]`}
          ></p>
          <p className="text-sm">Select All</p>
        </div>
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
