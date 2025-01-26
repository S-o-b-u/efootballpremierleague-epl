import { HeroVideoDialog } from '@/components/Brainrot'
import React from 'react'

const page = () => {
  return (
    <div className="relative px-[1rem] overflow-hidden md:overflow-auto scrollbar-hide md:px-[20rem] gap-5 md:mt-10 md:py-[10rem] flex flex-col items-center justify-center h-screen">
    <HeroVideoDialog
      className="dark:hidden block"
      animationStyle="from-center"
      videoSrc="https://www.youtube.com/embed/414EWLK0WFg"
      thumbnailSrc="../images/brainrot.jpg"
      thumbnailAlt="Hero Video"
    />
    <HeroVideoDialog
      className="hidden dark:block"
      animationStyle="from-center"
      videoSrc="https://www.youtube.com/embed/414EWLK0WFg"
      thumbnailSrc="../images/brainrot.jpg"
      thumbnailAlt="Hero Video"
    />
    <h1 className='text-white text-[5vh] text-center font-semibold'>Bhai BRAVE main maat kholna!!</h1>
  </div>
  )
}

export default page
