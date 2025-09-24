import React, { useState } from "react";

const DocCard = ({ selected, setSelected, url, name, uploadedAt }) => {
  const formattedDate = new Date(uploadedAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="py-4 px-5 border-1 border-gray-400 rounded-lg w-full flex justify-between items-center">
      <div className="flex items-center gap-8">
        <p
          className={`border-1 border-gray-500 cursor-pointer ${
            selected ? "bg-blue-600 border-none p-2 rounded-full" : "bg-white p-[5px]"
          }`}
          onClick={setSelected}
        ></p>
        <div className="flex flex-col gap-2">
          <p className="font-bold">{name}</p>
          <p className="text-sm text-gray-600">{formattedDate}</p>
        </div>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        View
      </a>
    </div>
  );
};

export default DocCard;
