import { useState } from 'react'
import './App.css'
import BlocklyWorkspace from './Components/BlocklyWorkspace/BlocklyWorkspace'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'
import { useEffect } from 'react'
import { loadFilesFromLocal } from './helpers/FileTools'
import Blockly from "blockly"

function App() {
  const [isHidden, setIsHidden] = useState(true)

  useEffect(() => {
    const workspace = localStorage.getItem('workspace')

    if(!workspace) localStorage.setItem('workspace', JSON.stringify({
      index: {},
      commands: {}
    }))

    loadFilesFromLocal()

    window.currentFile = "index"

    Blockly.serialization.workspaces.load(window.files.index, Blockly.getMainWorkspace())
  }, [])

  return (
    <>
      <Sidebar setIsHidden={setIsHidden} hidden={isHidden} />
      <Navbar />
      <BlocklyWorkspace hidden={isHidden} />
    </>
  )
}

export default App
