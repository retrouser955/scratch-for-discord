import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { BsFillTrash3Fill,BsUpload} from "react-icons/bs"
export default function Account() {
  const [data, setData] = useState(undefined)

  useEffect(() => {
  }, [])

  return (
    <div>
      <b>Misc</b>
      <p>Changelog, shortcuts, credit</p>
      {data}
    </div>
  )
}
