import { useState } from 'react'
import './App.css'
import BlocklyWorkspace from './Components/BlocklyWorkspace/BlocklyWorkspace'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'

function App() {
  const [isHidden, setIsHidden] = useState(false)

  return (
    <>
      <Sidebar setIsHidden={setIsHidden} hidden={isHidden} />
      <Navbar />
      <BlocklyWorkspace hidden={isHidden} />
    </>
  )
}

export default App
