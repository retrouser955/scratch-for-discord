import React from 'react'

export default function SourceControl() {
  return (
    <div>
      <b>Source Control</b>
      <div id="sc-main" class="nav-ele">
      <a href="https://github.com/login/oauth/authorize?scope=repo&client_id=b6d2e4d50218cbda081b"><button id="sc-login">Log In</button></a>
      <div id="sc-actions" hidden>
      <button>Pull</button>
      <br/>
      <button>Push</button>
      </div>
      </div>
    </div>
  )
}
