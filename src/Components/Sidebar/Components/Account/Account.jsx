import React from 'react'
import {oauth} from "../../../../sourceControl"
export default function Account() {
  return (
    <div>
      <b>Account</b>
      <div className="nav-ele">
      <button id="sc-login" onClick={oauth}>Log In with GitHub</button>
      </div>
    </div>
  )
}
