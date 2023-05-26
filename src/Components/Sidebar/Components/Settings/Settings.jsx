import React, { useEffect, useState } from 'react'
import { oauth } from "../../../../sourceControl"
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
            <div className="w-full flex pl-2 h-7 justify-center">
        <button className="excempt-button" onClick={() => {
        
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
        </button>
        <button className="excempt-button" onClick={() => {
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
        </button>
        <p> Edit - undo, redo, delete unused blocks, clean up blocks (this can be done automatically btw)</p>
      </div>
    </div>
  )
}
