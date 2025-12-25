import Image from 'next/image'
import React from 'react'
import { FaRegComment } from 'react-icons/fa'
import { AiOutlineHeart } from 'react-icons/ai'
import { IoStatsChart } from 'react-icons/io5'
import { FiShare } from 'react-icons/fi'

interface PostProps {
  post: {
    id: string;
    content: string;
    createdAt: { seconds: number } | null;
  };
}

function formatTimeAgo(seconds: number): string {
  const now = Date.now() / 1000;
  const diff = now - seconds;
  
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function Post({ post }: PostProps) {
  const timeAgo = post.createdAt 
    ? formatTimeAgo(post.createdAt.seconds) 
    : "just now";

  return (
    <div className='border-b border-gray-200'>
      <div className='flex p-3 space-x-3'>
        <Image 
          src={"/assets/troll-logo.jpg"}
          alt="Avatar"
          width={44}
          height={44}
          className='w-11 h-11 rounded-full'
        />
        <div className='flex-1 text-[15px]'>
          <div className='flex items-center space-x-1 text-[#707E89]'>
            <span className='font-bold text-[#0F1419] 
              inline-block whitespace-nowrap overflow-hidden text-ellipsis
              max-w-[100px] sm:max-w-[160px]
            '>Anonymous</span>
            <span className='whitespace-nowrap inline-block overflow-hidden text-ellipsis
              max-w-[100px] sm:max-w-[160px]'>@user</span>
            <span>·</span>
            <span className='whitespace-nowrap'>{timeAgo}</span>        
          </div>
          <p className='mt-1 text-[#0F1419]'>
            {post.content}
          </p>
          <div className='flex justify-between mt-3 max-w-[400px] text-[#707E89]'>
            <div className='flex items-center space-x-2 cursor-pointer hover:text-blue-500 group'>
              <FaRegComment className='w-4 h-4' />
              <span className='text-sm'>0</span>
            </div>
            <div className='flex items-center space-x-2 cursor-pointer hover:text-red-500 group'>
              <AiOutlineHeart className='w-4 h-4' />
              <span className='text-sm'>0</span>
            </div>
            <div className='flex items-center space-x-2 cursor-pointer hover:text-blue-500 group'>
              <IoStatsChart className='w-4 h-4' />
            </div>
            <div className='flex items-center cursor-pointer hover:text-blue-500 group'>
              <FiShare className='w-4 h-4' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
