import {
  EllipsisHorizontalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";

export default function Widgets() {
  return (
    <div className="p-3 flex flex-col space-y-4 bg-black w-[400px]">
      <div
        className="bg-[#EFF3F4] text-[#89959D] h-[44px] flex items-center
      space-x-3 rounded-full pl-5"
      >
        <MagnifyingGlassIcon className="w-5 h-5 text-[#89959D]" />
        <input
          type="text"
          placeholder="Seach Busy Troll"
          className="bg-transparent outline-none"
        />
      </div>

      <div className="bg-[#EFF3F4] rounded-xl p-3">
        <h1 className="text-xl font-bold mb-2">What's Happening?</h1>

        <div className="flex flex-col py-3">
          <div className="flex justify-between text-[#536471] text-[13px]">
            <span>Trending in Technology</span>
            <EllipsisHorizontalIcon className="w-5 h-5 cursor-pointer" />
          </div>
          <span className="font-bold text-[#0F1419]">React 18 Released</span>
          <span className="text-[#536471]">45.2K Posts</span>
        </div>
      </div>

      <div className="bg-[#EFF3F4] rounded-xl p-3">
        <h1 className="text-xl font-bold mb-2">Who to Follow</h1>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Image
              src={"/assets/avatar-woman-1.jpg"}
              alt="Logo"
              width={56}
              height={56}
              className="w-14 h-14 rounded-full"
            />
            <div className="flex flex-col text-sm">
              <span className="font-bold text-[#0F1419]">Troll Bot</span>
              <span className="text-[#536471]">@trollbot</span>
            </div>
          </div>
          <button
            className="bg-black text-white rounded-full w-[100px]
          h-[36px] text-sm"
          >
            Follow
          </button>
        </div>
      </div>
    </div>
  );
}
