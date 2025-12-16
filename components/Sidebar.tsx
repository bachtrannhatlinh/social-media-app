import React from "react";
import {
  HomeIcon,
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  UserIcon,
  EllipsisHorizontalCircleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

export default function Sidebar() {
  return (
    <nav className="h-screen hidden sm:flex flex-col sticky top-0 p-3 xl:ml-20">
      <div className="relative h-full">
        <div className="py-3">
          <Image
            src={"/assets/troll-logo.jpg"}
            alt="Logo"
            width={48}
            height={48}
          />
        </div>
        <ul>
          <SidebarLink Icon={HomeIcon} text="Home" />
          <SidebarLink Icon={HashtagIcon} text="Explore" />
          <SidebarLink Icon={BellIcon} text="Notifications" />
          <SidebarLink Icon={InboxIcon} text="Messages" />
          <SidebarLink Icon={BookmarkIcon} text="Bookmarks" />
          <SidebarLink Icon={UserIcon} text="Profile" />
          <SidebarLink Icon={EllipsisHorizontalCircleIcon} text="More" />
          <button className="xl:block hidden bg-[#F4AF01] w-[200px] h-[52px] rounded-full
          text-white font-medium cursor-pointer shadow-md mt-2">
            Bumble
          </button>
        </ul>
        <div className="absolute bottom-0">account</div>
      </div>
    </nav>
  );
}

interface SidebarLinkProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  text: string;
}

function SidebarLink({ Icon, text }: SidebarLinkProps) {
  return (
    <li className="flex items-center text-xl mb-6 space-x-3 p-2.5">
      <Icon className="h-7 w-7" />
      <span className="hidden xl:block">{text}</span>
    </li>
  );
}
