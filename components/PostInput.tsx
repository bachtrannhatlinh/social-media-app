import {
  CalendarIcon,
  ChartBarIcon,
  FaceSmileIcon,
  MapPinIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";

export default function PostInput() {
  return (
    <div className="flex space-x-5 p-3">
      <Image
        src={"/assets/troll-logo.jpg"}
        alt="Logo"
        className="w-11 h-11"
        width={44}
        height={44}
      />

      <div className="w-full">
        <textarea
          placeholder="What's happening?"
          className="resize-none w-full outline-none min-h-[50px] text-lg"
        />

        <div className="flex justify-between pt-5">
          <div className="flex space-x-1.5">
            <PhotoIcon className="w-[22px] h-[22px] text-[#F4AF01]" />
            <ChartBarIcon className="w-[22px] h-[22px] text-[#F4AF01]" />
            <FaceSmileIcon className="w-[22px] h-[22px] text-[#F4AF01]" />
            <CalendarIcon className="w-[22px] h-[22px] text-[#F4AF01]" />
            <MapPinIcon className="w-[22px] h-[22px] text-[#F4AF01]" />
          </div>

          <button
            className="bg-[#F4AF81] text-white w-[80px] h-[36px] rounded-full
        text-sm cursor-pointer"
          >
            Bumble
          </button>
        </div>
      </div>
    </div>
  );
}
