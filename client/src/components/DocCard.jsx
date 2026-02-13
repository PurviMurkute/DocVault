import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoMdStar } from "react-icons/io";
import { IoMdStarOutline } from "react-icons/io";
import { useNavigate } from "react-router";

const DocCard = ({
  selected,
  setSelected,
  _id,
  url,
  name,
  uploadedAt,
  isImportant,
  getDocuments,
  isDeleted,
  deletedAt,
}) => {
  const [important, setImportant] = useState(isImportant);

  const formattedDate = new Date(uploadedAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const navigate = useNavigate();

  const toggleImportant = async () => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/docs/${_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("JWT")}`,
          },
        }
      );

      if (response.data.success) {
        setImportant((prev) => !prev);
        getDocuments && getDocuments();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error?.response?.data?.message === "Invalid or expired token") {
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

  return (
    <div className="py-4 px-5 border border-gray-300 rounded-lg shrink-0 w-full flex justify-between items-center">
      <div className="flex items-center gap-4 md:gap-7 cursor-pointer">
        <div className="flex items-center gap-2">
          <p
            className={`border border-gray-500 hover:bg-blue-600 hover:rounded-full hover:scale-125 transition-transform duration-150 ${
              selected
                ? "bg-blue-600 border-none p-2 rounded-full"
                : "bg-white p-[5px]"
            }`}
            onClick={setSelected}
          ></p>

          {!isDeleted &&
            (!important ? (
              <IoMdStarOutline
                className="text-xl text-gray-400 hover:fill-yellow-600 hover:scale-110"
                onClick={toggleImportant}
              />
            ) : (
              <IoMdStar
                className="text-xl text-yellow-600 hover:scale-110"
                onClick={toggleImportant}
              />
            ))}
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-bold break-words text-sm md:text-md">{name}</p>
          <p className="text-xs md:text-sm text-gray-600">{formattedDate}</p>
          {isDeleted && deletedAt && (
            <p className="text-xs text-red-500">
              Deleted: {new Date(deletedAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
      {!isDeleted? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          View
        </a>
      ) : (
        null
      )}
    </div>
  );
};

export default DocCard;
