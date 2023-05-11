import React, {useRef} from 'react'
import {pull, push, selectRepo, selectBranch} from "../../../../sourceControl"
export default function SourceControl() {
  return (
    <div>
      <b>Source Control</b>
      <div id="sc-main" className="nav-ele" >
      <button onClick={pull}>Pull</button>
      <br/>
      <button onClick={push}>Push</button>
      <br/>
      <button onClick={selectRepo}>Select Repo</button>
      <br/>
      <button onClick={selectBranch}>Select Branch</button>
      </div>
    </div>
  )
}
