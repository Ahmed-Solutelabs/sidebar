import React from "react";
import { PencilSquareIcon, UserIcon } from "@heroicons/react/16/solid";
const SpeakerCard = ({ speakerDetails, selectHandler }) => {
  return (
    <div
      className={`flex gap-4 relative p-2 border rounded cursor-pointer ${
        speakerDetails?.isSelected ? " border-green-600" : "border-transparent"
      }`}
      onClick={() => selectHandler(speakerDetails?.id)}
    >
      <input
        type="checkbox"
        className="absolute top-2 right-2 accent-green-500"
        checked={speakerDetails?.isSelected}
      />
      <div className="w-12 h-12 bg-gray-200 rounded-full flex justify-center items-center">
        <UserIcon className="w-8 h-8 text-gray-400" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-bold">{speakerDetails?.name}</p>
        <div className="flex text-gray-400">
          <p className="text-sm pr-2 border-r border-gary-400">
            {speakerDetails?.designation}
          </p>
          <p className="text-sm px-2 ">{speakerDetails?.organization}</p>
        </div>
        <div className="flex gap-2 items-center text-orange-500">
          <PencilSquareIcon className="w-4 h-4" />
          <p>Edit Speaker</p>{" "}
        </div>
      </div>
    </div>
  );
};

export default SpeakerCard;
