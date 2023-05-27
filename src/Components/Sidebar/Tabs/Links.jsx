import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { BsFillTrash3Fill,BsUpload, BsDiscord,BsGithub} from "react-icons/bs"
import {IoIosHelpCircle} from "react-icons/io"
import {AiFillBook} from "react-icons/ai"
export default function Account() {
  const [data, setData] = useState(undefined)

  useEffect(() => {
  }, [])

  return (
    <div>
      <b>Links</b>
      <ul className="pl-4">
        <li className="flex">
          <BsDiscord size={20} className="mr-1" />
          <a href="https://discord.gg/TsQPMrNyBv" target="_blank">Discord</a>
        </li>
        <li className="flex">
          <BsGithub size={20} className="mr-1" />
          <a href="https://github.com/scratch-for-discord/Web-Application_Frontend" target="_blank">Github</a>
        </li>
        <li className="flex">
          <IoIosHelpCircle size={20} className="mr-1" />
          <a href="https://docs.scratch-for-discord.com/use" target="_blank">Documentation</a>
        </li>
        <li className="flex">
          <AiFillBook size={20} className="mr-1" />
          <a href="https://docs.scratch-for-discord.com/use" target="_blank">Guide</a>
        </li>
      </ul>
      {data}
    </div>
  )
}
