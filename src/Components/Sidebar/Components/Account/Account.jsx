import React, { useEffect, useState } from 'react'
import {oauth} from "../../../../sourceControl"

function UserCard({ userData }) {
  return (
    <div className="w-[80%] h-60 border-2 pt-5 border-white rounded-lg mx-auto">
      <img src={userData.avatar_url} alt={`${userData.login} avatar`} className="mx-auto rounded-full w-[70%] mb-2" />
      <h1 className="text-center text-2xl truncate text-white font-semibold">{userData.login}</h1>
      <p className="text-center text-zinc-400 text-lg">{userData.name}</p>
    </div>
  )
}

export default function Account() {
  const [data, setData] = useState(undefined)

  useEffect(() => {
    const userData = localStorage.getItem("userData")

    if(!userData) return setData(
      <div className="nav-ele">
        <button id="sc-login" onClick={oauth}>Log In with GitHub</button>
      </div>
    )

    const u = JSON.parse(userData)

    setData(<UserCard userData={u} />)
  }, [])

  return (
    <div>
      <b>Account</b>
      {data}
    </div>
  )
}
