import React, { useEffect, useState } from 'react'
import { oauth } from "../../../../sourceControl"

export default function Account() {
  const [data, setData] = useState(undefined)

  useEffect(() => {
  }, [])

  return (
    <div>
      <b>Settings</b>
      {data}
    </div>
  )
}
