import React, { useContext, useEffect, useRef, useState } from "react";
import { IKContext, IKUpload } from "imagekitio-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router";
import DocCard from "../components/DocCard";
import MiniHeader from "../components/MiniHeader";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const [documents, setDocuments] = useState([]);

  const [getDocs, setGetDocs] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [fileName, setFileName] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState("All Docs");

  const toggleSelected = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((docId) => docId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  const uploadRef = useRef();

  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1200) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchAuth = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/auth`);
      if (res.data.success) {
        return res.data.data;
      } else {
        throw new Error("Failed to fetch auth params");
      }
    } catch (err) {
      console.error("❌ Auth Fetch Failed", err);
      return null;
    }
  };

  const uploadDoc = async (docData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/docs`,
        {
          ...docData,
          userId: user?._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("JWT")}`,
          },
        }
      );

      if (response.data.success) {
        setDocuments(response.data.data);
        await getDocuments();
        toast.success(response.data.message);
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

  const getDocuments = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/docs`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("JWT")}`,
          },
        }
      );

      if (response.data.success) {
        setGetDocs(response.data.data);
      } else {
        toast.error(error?.response?.data?.message || error?.message);
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

  useEffect(() => {
    getDocuments();
  }, []);

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
    <div className="flex">
      <div className={`${isSidebarOpen ? "w-1/6" : "w-0"}`}>
        <Sidebar
          getDocs={getDocs}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          onUploadOnclick={() => uploadRef.current?.click()}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />
      </div>
      <div className="w-full">
        <hr className=" text-blue-50" />
        <MiniHeader
          selected={selected}
          setSelected={setSelected}
          getDocuments={getDocuments}
          getDocs={getDocs}
          setGetDocs={setGetDocs}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div>
          <IKContext
            publicKey={import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY}
            urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
            authenticator={fetchAuth}
          >
            <IKUpload
              ref={uploadRef}
              id="custom-upload"
              multiple={true}
              fileName={fileName}
              accept="*/*"
              className="hidden"
              onSelect={(event) => {
                const files = Array.from(event.target.files);
                if (files.length > 0) {
                  toast.loading(`Uploading ${files.length} file(s)...`, {
                    id: "upload-toast",
                  });
                  files.forEach((file) => {
                    setFileName(file.name); // use original name for each file
                  });
                }
              }}
              onUploadStart={() => {
                toast.loading("Uploading...", { id: "upload-toast" });
              }}
              onError={(err) =>
                toast.error("Upload failed ❌", err, { id: "upload-toast" })
              }
              onSuccess={(res) => {
                const docData = {
                  url: res.url,
                  name: res.name,
                  fileid: res.fileId,
                  type: res.fileType,
                  size: res.size,
                };

                setGetDocs((prev) => [...prev, docData]); // ✅ store multiple docs
                uploadDoc(docData);

                setTimeout(() => {
                  toast.success(`${res.name} uploaded ✅`, {
                    id: "upload-toast",
                  });
                }, 1000);
              }}
            />
          </IKContext>
        </div>
        <div>
          <div className="font-bold text-gray-600 px-2 md:px-15 pt-4 flex justify-between items-center">
            <p>Documents</p>
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
          {getDocs.length === 0 ? (
            <div className="flex flex-col justify-center items-center mt-20">
              <img src="/empty.png" alt="emptybox" className="w-[250px]" />
              <p className="font-medium font-sans text-center px-5">
                Your vault is empty - upload a document to get started.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-5 px-2 md:px-13 py-4">
              {getDocs.map((doc) => {
                const { _id, url, name, uploadedAt } = doc;

                const ext = name.split(".").pop();

                return (
                  <>
                    {selectedMenu === "All Docs" ? (
                      <DocCard
                        key={_id}
                        selected={selected.includes(_id)}
                        setSelected={() => toggleSelected(_id)}
                        url={url}
                        name={name}
                        uploadedAt={uploadedAt}
                      />
                    ) : selectedMenu === "Images" &&
                      (ext === "png" ||
                        ext === "jpg" ||
                        ext === "jpeg" ||
                        ext === "webp") ? (
                      <DocCard
                        key={_id}
                        selected={selected.includes(_id)}
                        setSelected={() => toggleSelected(_id)}
                        url={url}
                        name={name}
                        uploadedAt={uploadedAt}
                      />
                    ) : selectedMenu === "PDF's" && ext === "pdf" ? (
                      <DocCard
                        key={_id}
                        selected={selected.includes(_id)}
                        setSelected={() => toggleSelected(_id)}
                        url={url}
                        name={name}
                        uploadedAt={uploadedAt}
                      />
                    ) : null}
                  </>
                );
              })}
            </div>
          )}
        </div>
        <Toaster />
      </div>
    </div>
  );
};

export default Dashboard;
