import React from 'react'
import { generateCommandContent, generateMainFileContent, downloadZip} from '../../helpers/ExportFiles'
import { FiDownload } from "react-icons/fi"
import Swal from 'sweetalert2'

function download() {
  Swal.fire({
    title: 'Download all files or individuals?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: `All`,
    denyButtonText: `Individual`,
  }).then((result) => {
    if (result.isConfirmed) {
      downloadZip(true, true, true, true)
    } else if (result.isDenied) {
      //show files on current modal and on click download
      Swal.fire({
        title: 'Select files to download',
        html: `
        <div class="flex flex-col">
          <div class="flex flex-row">
            <input type="checkbox" id="main" name="main" value="main" checked>
            <label for="main">main.js</label>
          </div>
          <div class="flex flex-row">
            <input type="checkbox" id="commands" name="commands" value="commands" checked>
            <label for="commands">commands</label>
          </div>
          <div class="flex flex-row">
            <input type="checkbox" id="package" name="package" value="package" checked>
            <label for="package">package.json</label>
            </div>
          <div class="flex flex-row">
            <input type="checkbox" id="json" name="json" value="json" checked>
            <label for="json">s4d.json</label>
          </div>
        </div>
        `,
        focusConfirm: false,
        showDenyButton: true,
        denyButtonText: `Cancel`,
        preConfirm: () => {
          const main = document.getElementById('main').checked
          const commands = document.getElementById('commands').checked
          const json = document.getElementById('package').checked
          const workspace = document.getElementById('json').checked
          downloadZip(main, commands, json, workspace)
        }
      })

    }
  })
}
export default function Navbar() {
  return (
    <div className="absolute top-0 left-0 px-3 w-screen h-[10vh] bg-neutral-900 flex select-none border-b-2 border-neutral-800">
      <img src="https://scratch-for-discord.com/scratch.png" draggable={false} alt="s4d-logo" className="h-[5vh] mx-3 my-auto select-none" />
      <p className="text-white text-2xl font-bold my-auto">Scratch For Discord</p>
      <button className="ml-auto h-10 text-white flex items-center my-auto" onClick={() => {
        Swal.fire({
          title: 'Javascript of your bot',
          html: 
          `
          <h3 class="text-2xl font-bold my-auto">index.js</h3>
          <textarea id="swal-input1" placeholder="command1" class="swal2-input"  style="height: auto; width:95%" readonly>${generateMainFileContent()}</textarea>
          <h3 class="text-2xl font-bold my-auto">commands.js</h3>
          <textarea id="swal-input2" placeholder="command1" class="swal2-input"  style="height: auto; width:95%" readonly>${generateCommandContent()}</textarea>
          `,
          grow: 'fullscreen',
          focusConfirm: false,
          confirmButtonText: `Copy`,
          showDenyButton: true,
          denyButtonText: `Cancel`,
          didOpen: () => {
            const textarea = document.getElementById('swal-input1');
            textarea.style.height = `${textarea.scrollHeight + 10}px`;
          },
          preConfirm: () => {
            const value = document.getElementById('swal-input1').value
            navigator.clipboard.writeText(value)
            return false
          }
        })
        console.log(generateMainFileContent())
        console.log(generateCommandContent())
      }}>Generate Code</button>
      <div id='download-button' className='text-white text-3xl font-bold my-auto'><FiDownload 
        size={25} onClick={download}
      /></div>
    </div>
  )
}