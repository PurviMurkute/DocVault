import React, { useContext, useEffect, useRef, useState } from "react";
import { IKContext, IKUpload } from "imagekitio-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "../context/UserContext";
import { useLocation, useNavigate } from "react-router";
import DocCard from "../components/DocCard";
import MiniHeader from "../components/MiniHeader";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";

const Dashboard = () => {
  const [documents, setDocuments] = useState([]);

  const [getDocs, setGetDocs] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [fileName, setFileName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [tempDeleted, setTempDeleted] = useState([]);

  const toggleSelected = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((docId) => docId !== id) : [...prev, id]
    );
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

  const location = useLocation();

  const isDashboard = location.pathname === "/dashboard";
  const isImages = location.pathname === "/dashboard/images";
  const isPdfs = location.pathname === "/dashboard/pdf's";
  const isImp = location.pathname === "/dashboard/imp's";
  const isTrash = location.pathname === "/dashboard/trash";

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
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/docs`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("JWT")}`,
          },
        }
      );

      if (response.data.success) {
        setGetDocs(response.data.data || []);
      } else {
        setGetDocs([]);
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
    } finally {
      setLoading(false);
    }
  };

  const getTempDeleted = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/docs/deleted`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("JWT")}`,
          },
        }
      );

      if (response.data.success) {
        setTempDeleted(response.data.data);
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

  const searchDocs = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/docs/search?query=${searchText}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("JWT")}`,
          },
        }
      );

      console.log(response.data);

      if (response.data.success) {
        setGetDocs(response.data.data);
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

  useEffect(() => {
    if (searchText) {
      searchDocs();
    } else if (isTrash) {
      getTempDeleted();
    } else {
      getDocuments();
    }
  }, [searchText, isTrash]);

  const onUploadOnclick = () => {
    uploadRef.current?.click();
    if (window.innerWidth < 1200) {
      setIsSidebarOpen(false);
    }
  };

  const closeSideBar = () => {
    if (window.innerWidth < 1200) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex">
      <div className={`${isSidebarOpen ? "w-1/6" : "w-0"}`}>
        <Sidebar
          getDocs={getDocs}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          onUploadOnclick={onUploadOnclick}
          closeSideBar={closeSideBar}
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
          selectAll={selectAll}
          setSelectAll={setSelectAll}
          searchText={searchText}
          setSearchText={setSearchText}
          isTrash={isTrash}
          isImages={isImages}
          isPdfs={isPdfs}
          isImp={isImp}
          tempDeleted={tempDeleted}
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

                setGetDocs((prev) => [...prev, docData]);
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
          <p className="text-gray-600 font-bold ps-3 md:ps-13 mt-5">
            Documents
          </p>
          {loading ? (
            <Loader loadingText={"loading your documents"} />
          ) : (!getDocs || getDocs.length === 0) && !searchText && !tempDeleted ? (
            <div className="flex flex-col justify-center items-center mt-20">
              <img src="/empty.png" alt="emptybox" className="w-[250px]" />
              <p className="font-medium font-sans text-center px-5">
                Your vault is empty - upload a document to get started.
              </p>
            </div>
          ) : (searchText && (!getDocs || getDocs.length === 0)) ||
            (searchText && isTrash && (!tempDeleted || tempDeleted.length === 0)) ? (
            <div className="text-center py-30 text-gray-500 px-6">
              Opps.. No documents found for your search{" "}
              <span className="font-bold">{searchText}</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-5 px-2 md:px-13 py-4">
              {(isTrash ? tempDeleted : getDocs)?.map((doc) => {
                const {
                  _id,
                  url,
                  name,
                  uploadedAt,
                  isImportant,
                  isDeleted,
                  deletedAt,
                } = doc;

                const ext = name.split(".").pop();

                return (
                  <>
                    {isDashboard ? (
                      <DocCard
                        key={_id}
                        _id={_id}
                        selected={selected.includes(_id)}
                        setSelected={() => toggleSelected(_id)}
                        url={url}
                        name={name}
                        uploadedAt={uploadedAt}
                        isImportant={isImportant}
                        getDocuments={getDocuments}
                      />
                    ) : isImages &&
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
                        isImportant={isImportant}
                        getDocuments={getDocuments}
                      />
                    ) : isPdfs && ext === "pdf" ? (
                      <DocCard
                        key={_id}
                        _id={_id}
                        selected={selected.includes(_id)}
                        setSelected={() => toggleSelected(_id)}
                        url={url}
                        name={name}
                        uploadedAt={uploadedAt}
                        isImportant={isImportant}
                        getDocuments={getDocuments}
                      />
                    ) : isImp && isImportant ? (
                      <DocCard
                        key={_id}
                        _id={_id}
                        selected={selected.includes(_id)}
                        setSelected={() => toggleSelected(_id)}
                        url={url}
                        name={name}
                        uploadedAt={uploadedAt}
                        isImportant={isImportant}
                        getDocuments={getDocuments}
                      />
                    ) : isTrash ? (
                      <DocCard
                        key={_id}
                        _id={_id}
                        selected={selected.includes(_id)}
                        setSelected={() => toggleSelected(_id)}
                        url={url}
                        name={name}
                        uploadedAt={uploadedAt}
                        getDocuments={getTempDeleted}
                        isDeleted={isDeleted}
                        deletedAt={deletedAt}
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
