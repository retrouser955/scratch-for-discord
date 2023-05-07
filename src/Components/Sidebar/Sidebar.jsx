import React, { useEffect } from 'react'
import { GoFileSubmodule } from "react-icons/go"
import { RiAccountCircleFill } from "react-icons/ri"
import { VscSourceControl } from "react-icons/vsc"
import { BsArrowBarRight } from "react-icons/bs"
import useSwitch from "./Components/Switcher/Swtich"

function Bar() {
    return <div className="bg-white h-[2px] w-[80%] rounded-sm mx-auto my-2"></div>
}

export default function Sidebar({ setIsHidden, hidden }) {
    const [tab, setTab] = useSwitch()

    useEffect(() => {
        setTab(0)
    }, [])

    return (
        <div className="w-[15vw] bg-zinc-950 top-0 absolute left-0 h-screen">
            <div className="absolute left-0 h-full w-[3vw] bg-black pt-[10vh]">
                <GoFileSubmodule size={25} className="mx-auto text-white hover:text-orange-500 transition-all cursor-pointer" onClick={() => setTab(0)} />
                <Bar />
                <VscSourceControl size={25} className="mx-auto text-white hover:text-orange-500 transition-all cursor-pointer" onClick={() => setTab(1)} />
                <Bar />
                <RiAccountCircleFill size={35} className="mx-auto text-white hover:text-orange-500 transition-all cursor-pointer" onClick={() => setTab(2)} />
                <Bar />
                <BsArrowBarRight size={35} className={`mx-auto ${hidden ? "text-orange-500" : "text-white"} hover:${hidden ? "text-white" : "text-orange-500"} transition-all cursor-pointer`} onClick={() => {
                    setIsHidden(!hidden)
                }} />
            </div>

            <div className='text-white h-full w-full pl-[3vw] pt-[10vh]'>
                {tab}
            </div>
        </div>
    )
}
