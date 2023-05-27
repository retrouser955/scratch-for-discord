import React, { useEffect, useState } from 'react'
import { oauth } from "../../../sourceControl"
import Swal from 'sweetalert2'
import { BsFillTrash3Fill,BsUpload} from "react-icons/bs"
export default function Account() {
  const [data, setData] = useState(undefined)

  useEffect(() => {
  }, [])

  return (
    <div>
      <b>Settings</b>
      {data}
            <div className="w-full pl-2 h-7">
        <button className="excempt-button flex pl-1" onClick={() => {
        
              const file = document.createElement('input')
              file.type = 'file'
              file.accept = '.s4d'
              file.onchange = () => {
                const reader = new FileReader()
                reader.onload = () => {
                  const data = JSON.parse(reader.result)
                  localStorage.setItem('files', JSON.stringify(data))
                  window.location.reload()
                }
                reader.readAsText(file.files[0])
              }
              file.click()
          
        }}>
        <BsUpload className="text-green-600 cursor-pointer mr-1" />
        <p> open file...</p>
        </button>
        <button className="excempt-button flex" onClick={() => {
          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ff0000',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              const files = JSON.parse(localStorage.getItem('workspace'))
              files.commands = {}
              localStorage.setItem('workspace', JSON.stringify(files))   
            }
          })
        }}>
         <BsFillTrash3Fill className="text-red-600 cursor-pointer ml-1" />
         <p> Delete workspace</p>
        </button>
          </div>  
          <div className="pl-4 pt-12 hidden">
          <p className="font-bold">Workspace</p>
          <ul className="pl-2 cursor-pointer">
            <li>
              <p>Undo</p>
            </li>
            <li>
              <p>Redo</p>
            </li>
            <li>
              <p>Clean up blocks</p>
            </li>
            <li>
              <p>Delete unused blocks</p>
            </li>
          </ul>
          </div>
    </div>
  )
}
