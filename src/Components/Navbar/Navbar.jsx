import React from 'react'
import { generateCommandContent, generateMainFileContent, downloadZip } from '../../helpers/ExportFiles'
import { FiDownload } from "react-icons/fi"
export default function Navbar() {
  return (
    <div className="absolute top-0 left-0 px-3 w-screen h-[10vh] bg-neutral-900 flex select-none border-b-2 border-neutral-800">
      <img src="https://scratch-for-discord.com/scratch.png" draggable={false} alt="s4d-logo" className="h-[5vh] mx-3 my-auto select-none" />
      <p className="text-white text-2xl font-bold my-auto">Scratch For Discord</p>
      <button className="ml-auto h-10 text-white flex items-center my-auto" onClick={() => {
        console.log(generateMainFileContent())
        console.log(generateCommandContent())
      }}>Generate Code</button>
      <div id='download-button' className='text-white text-3xl font-bold my-auto'><FiDownload 
        size={25} onClick={downloadZip}
      /></div>
    </div>
  )
}
