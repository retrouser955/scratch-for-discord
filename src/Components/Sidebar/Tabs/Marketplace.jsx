import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { BsFillTrash3Fill,BsUpload} from "react-icons/bs"
export default function Account() {
  const [data, setData] = useState(undefined)

  useEffect(() => {
  }, [])

  return (
    <div>
      <b>Marketplace</b>
      <br></br>
      <button className="excempt-button" onClick={() => {
        Swal.fire({
            title: 'function to open marketplace'
        })
        }}>
        click
        </button>
      {data}
    </div>
  )
}
