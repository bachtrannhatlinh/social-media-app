import React from "react";
import LogInModal from "./Modals/LogInModal";
import SignUpModal from "./Modals/SignUpModal";

export default function SignUpPrompt() {  
  return (
    <div className=" fixed w-full h-[80px] bg-[#F4AF01] bottom-0
    flex justify-between items-center md:space-x-5 lg:justify-between
    lg:px-20 xl:px-40 2xl:px-80">
      <div className="hidden md:flex flex-col text-white">
        <span>Don't miss out on the top</span>
        <span>People on Busy Bee are always the first to know.</span>
      </div>
      <div className="flex space-x-2 w-full md:w-fit p-3">
        <LogInModal />
        <SignUpModal  />
      </div>
    </div>
  );
}
