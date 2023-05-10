import React, { useEffect, useState } from 'react'
import { SiJavascript } from "react-icons/si"
import { AiFillFolder } from "react-icons/ai"
import { backUpFilesToLocal, loadFilesFromLocal } from '../../../../helpers/FileTools'
import Swal from 'sweetalert2'
import { AiFillFileAdd } from 'react-icons/ai'
import { BsFillTrash3Fill } from "react-icons/bs"
import { switchFiles } from "../../../../helpers/fileLoader.js"

function Folder({ name }) {
  return <>
    <div className="select-none font-bold pl-2 w-full hover:border-2 hover:border-white transition-all flex h-7 items-center">
      <div className="h-[70%] mr-1">
        <AiFillFolder className="w-full h-full" />
      </div>
      {name}
    </div>
  </>
}

function CommandFile({ name, reload, reloader }) {
  return <>
    <div className="w-[95%] group ml-[5%] font-bold select-none pl-2 hover:border-2 hover:border-white transition-all flex h-7 items-center">
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

          delete window.files.commands[name]

          backUpFilesToLocal()

          reload(!reloader)
        }} />
      </div>
    </div>
  </>
}

function JavaScriptMainFile({ name, reload, reloader }) {
  return <>
    <div className="select-none px-2 w-full font-bold hover:border-2 hover:border-white transition-all flex h-7 items-center" onClick={() => switchFiles("index", reload, reloader, false, true)}>
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

  return (
    <div>
      <b>Files</b>

      <div className="w-full mt-3">
        <div className="w-full flex items-center pl-2 h-7">
          <AiFillFileAdd className="h-full cursor-pointer hover:text-gray-500 transition-all" onClick={async () => {
            const { value: formValues } = await Swal.fire({
              title: 'Name your file',
              html: '<input id="swal-input1" class="swal2-input">',
              focusConfirm: false,
              preConfirm: () => {
                return [
                  document.getElementById('swal-input1').value
                ]
              }
            })

            loadFilesFromLocal()

            window.files.commands[formValues] = {}

            const commandDupe = [...files]

            commandDupe.push(<CommandFile reload={reloadDom} reloader={reloadReader} name={formValues} />)

            setFiles(commandDupe)

            backUpFilesToLocal()
          }} />

          <p className="ml-3"><span className="font-bold">{window.currentFile}.js</span></p>
        </div>

        <Folder name="commands" />
        {files}
        <JavaScriptMainFile name="index" reload={reloadDom} reloader={reloadReader} />
      </div>
    </div>
  )
}
