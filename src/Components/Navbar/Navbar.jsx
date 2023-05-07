import React from 'react'

export default function Navbar() {
  return (
    <div className="absolute top-0 left-0 w-screen h-[10vh] bg-black flex select-none">
      <img src="https://scratch-for-discord.netlify.app/scratch.png" draggable={false} alt="s4d-logo" className="h-[6vh] mx-3 my-auto select-none" />
      <p className="text-white text-4xl font-bold my-auto">Scratch For Discord</p>
    </div>
  )
}
