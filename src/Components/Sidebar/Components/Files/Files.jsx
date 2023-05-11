import React, { useEffect, useState } from 'react'
import { SiJavascript } from "react-icons/si"
import { AiFillFolder } from "react-icons/ai"
import { backUpFilesToLocal, loadFilesFromLocal } from '../../../../helpers/FileTools'
import Swal from 'sweetalert2'
import { AiFillFileAdd, AiOutlinePlus } from 'react-icons/ai'
import { BsFillTrash3Fill, BsFillPencilFill } from "react-icons/bs"
import { switchFiles } from "../../../../helpers/fileLoader.js"

function Folder({ name, onClickNew }) {
  return <>
    <div className="select-none font-bold pl-2 w-full border-2 border-transparent hover:border-white transition-all flex h-7 items-center justify-between">
      <div className="flex direction-row items-center">
        <div className="h-[70%] mr-1">
          <AiFillFolder />
        </div>
        {name}
      </div>
      {onClickNew ? (
        <button onClick={onClickNew} className="excempt-button">
          <AiOutlinePlus />
        </button>
      ) : null
      }
    </div>
  </>
}

function CommandFile({ name, reload, reloader }) {
  return <>
    <div className={`w-[95%] group ml-[5%] select-none pl-2 border-2 ${name === window.currentFile ? "border-white" : "border-transparent"} hover:border-white transition-all flex h-7 items-center`}>
      <div className="flex items-center w-[90%]" onClick={() => switchFiles(name, reload, reloader, false, true)}>
        <div className="h-[70%] mr-1">
          <SiJavascript className="w-full h-full text-yellow-500" />
        </div>
        {name}.js
      </div>
      <div className="h-[60%] w-[10%] hidden group-hover:block ml-auto mr-2">
        <BsFillTrash3Fill className="text-red-600 cursor-pointer" onClick={() => {
          if (name === window.currentFile) {
            switchFiles('index', reload, reloader, true, false)
          }
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
              delete window.files.commands[name]

              backUpFilesToLocal()
              reload(!reloader)
            }
          })
        }} />
      </div>
    </div>
  </>
}

function JavaScriptMainFile({ name, reload, reloader }) {
  return <>
    <div className={`select-none px-2 w-full hover:border-white border-2 ${name === window.currentFile ? "border-white" : "border-transparent"} transition-all flex h-7 items-center`} onClick={() => switchFiles("index", reload, reloader, false, true)}>
      <div className="h-[70%] mr-1">
        <SiJavascript className="w-full h-full text-yellow-500" />
      </div>
      {name}.js
    </div>
  </>
}

export default function Files() {
  const [files, setFiles] = useState([])
  const [reloadReader, reloadDom] = useState(true)

  useEffect(() => {
    loadFilesFromLocal()

    const commandFiles = []

    for (const command in window.files.commands) {
      commandFiles.push(<CommandFile reload={reloadDom} name={command} reloader={reloadReader} />)
    }

    setFiles(commandFiles)
  }, [reloadReader])

  async function createNewFile() {
    const { value: formValues } = await Swal.fire({
      title: 'Name your file',
      html: '<input id="swal-input1" placeholder="command1" class="swal2-input">',
      focusConfirm: false,
      showDenyButton: true,
      preConfirm: () => {
        const value = document.getElementById('swal-input1').value   
        if (!value.match(/[A-Za-z0-9]{3}/)) Swal.showValidationMessage('File name must be 3 characters long and can only contain letters and numbers!')
        if (window.files.commands[value]) Swal.showValidationMessage('This file already exists!')
        if (!value) Swal.showValidationMessage('You need to write something!')
        return [
          value
        ]
      }
    })
    if (!formValues) return
    loadFilesFromLocal()

    window.files.commands[formValues] = {}

    const commandDupe = [...files]

    commandDupe.push(<CommandFile reload={reloadDom} reloader={reloadReader} name={formValues} />)

    setFiles(commandDupe)

    backUpFilesToLocal()
  }

  function ProjectName() {
    const [name, setProjectName] = useState(localStorage.getItem("projectName") || 'Untitled Project');
  
    useEffect(() => {
      window.addEventListener('storage', () => {
        setProjectName(localStorage.getItem("projectName") || 'Untitled Project');
      })
    }, []);
    return (
    <>
    <div className="select-none font-bold pl-2 w-full transition-all flex h-7 items-center justify-between">
      <div className="flex direction-row items-center overflow-auto">
        {name}
      </div>
        <button onClick={changeProjectName} className="excempt-button">
          <BsFillPencilFill className="pr-1"/>
        </button>

    </div>
    </>
      )
  }

 async function changeProjectName() {
      await Swal.fire({
      title: 'Name your project',
      html: '<input id="swal-input1" class="swal2-input">',
      focusConfirm: false,
      preConfirm: () => {
      let projectName = document.getElementById('swal-input1').value
      if (!projectName) return
      localStorage.setItem("projectName", projectName)
      window.dispatchEvent( new Event('storage') )
      Swal.fire({
        title: `Succesfully Set Project Name to ${projectName}!`,
      })
      }
    })
  }

  return (
    <div>
      <b>Files</b>

      <div className="w-full mt-3">
        <div className="w-full flex items-center pl-2 h-7">
          <ProjectName className="h-full cursor-pointer hover:text-gray-500 transition-all pb-5" />
        </div>

        <Folder name="commands" onClickNew={createNewFile} />
        {files}
        <JavaScriptMainFile name="index" reload={reloadDom} reloader={reloadReader} />
      </div>
    </div>
  )
}
