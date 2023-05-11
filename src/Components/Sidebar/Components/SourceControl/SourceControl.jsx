import React, { useState, useEffect } from 'react';
import {pull, push, selectRepo, selectBranch} from "../../../../sourceControl"

function Stats() {
  const [repo, setRepo] = useState(localStorage.getItem("repo") || 'Not selected');
  const [branch, setBranch] = useState(localStorage.getItem("branch") || 'Not selected');

  useEffect(() => {
    // Listen for changes to the "branch" key in localStorage
    window.addEventListener('storage', () => {
      console.log("localstorage change omg")
      setBranch(localStorage.getItem("branch") || 'Not selected');
      setRepo(localStorage.getItem("repo") || 'Not selected');
    })
  }, []); // Empty dependency array to run the effect only once

  return (
  <>
  <p>Repo: {repo}</p>
  <p>Branch: {branch}</p>
  </>
    )
}
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
      <br/>
      <Stats/>
      </div>
      
    </div>
  )
}
