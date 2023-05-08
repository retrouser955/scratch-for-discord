import React, { useEffect, useState } from 'react'
import {oauth} from "../../../../sourceControl"

function UserCard({ userData }) {
  return (
    <div className="w-[90%] h-60 border-2 pb-3 border-white rounded-lg mx-auto">
      <img src={userData.avatar_url} alt={`${userData.login} avatar`} className="mx-auto rounded-full mb-2" />
      <h1 className="text-center text-4xl text-white font-semibold">{userData.login}</h1>
      <h2 className="text-center text-zinc-400 text-2xl">{userData.name}</h2>
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
