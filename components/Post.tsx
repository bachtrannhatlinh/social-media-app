import Image from 'next/image'
import React from 'react'

export default function Post() {
  return (
    <div>
      <PostHeader />      
    </div>
  )
}

export function PostHeader() {
  return (
    <div className='flex p-3 space-x-5'>
      <Image 
        src={"/assets/troll-logo.jpg"}
        alt="Logo"
        width={44}
        height={44}
        className='w-11 h-11'
      />
      <div className='text-[15px] flex flex-col space-y-1.5'>
        <div className='flex space-x-1.5 text-[#707E89]'>
          <span className='font-bold text-[#0F1419] 
          inline-block whitespace-nowrap overflow-hidden text-ellipsis
          max-w-[60px] min-[400px]:max-w-[100px] min-[500px]:max-w-[140px]
          sm:max-w-[160px]
          '>Troll Bot</span>
          <span className='whitespace-nowrap inline-block whitespace-nowrap overflow-hidden text-ellipsis
          max-w-[60px] min-[400px]:max-w-[100px] min-[500px]:max-w-[140px]
          sm:max-w-[160px]'>@trollbot · 1h</span>
          <span>*</span>
          <span>a day ago</span>        
        </div>
        <span>
          This is a sample post content to demonstrate the Post component structure.
        </span>
      </div>
    </div>
  )
}

