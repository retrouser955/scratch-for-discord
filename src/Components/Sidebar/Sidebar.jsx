import React, { useState, useEffect } from 'react';
import { GoFileSubmodule } from "react-icons/go"
import { RiAccountCircleFill } from "react-icons/ri"
import { VscSourceControl } from "react-icons/vsc"
import { BsArrowBarRight } from "react-icons/bs"
import useSwitch from "./Components/Switcher/Swtich"

function Bar({ className }) {
    if (!className) className = ""
        console.log(className)
        return <div className={`bg-white h-[2px] w-[80%] rounded-sm mx-auto my-2 ${className}`} />
}

export default function Sidebar({ setIsHidden, hidden }) {
    console.log(hidden, setIsHidden)
    const [tab, setTab] = useSwitch()
    const [activeTab, setActiveTab] = useState(0);
    useEffect(() => {
        setTab(0)
    }, [])
    const switchTab = (index) => {
        setActiveTab(index);
        setTab(index);
      };
      const userData = localStorage.getItem("userData");
      let logged = userData ? true : false;
      return (
        <div className="w-[15vw] bg-zinc-950 top-0 absolute left-0 h-screen">
          <div className="absolute left-0 h-full w-[3vw] bg-black pt-[10vh]">
            <GoFileSubmodule
              size={25}
              className={`mx-auto ${activeTab === 0 && hidden === true ? "text-orange-500" : "text-white"} hover:text-orange-500 transition-all cursor-pointer`}
              onClick={() => switchTab(0)}
            />
            <Bar />
            <RiAccountCircleFill
              size={35}
              className={`mx-auto ${activeTab === 2 && hidden === true ? "text-orange-500" : "text-white"} hover:text-orange-500 transition-all cursor-pointer`}
              onClick={() => switchTab(2)}
            />
            {/* make a bar hidden when not logged in */}
            <Bar className={`${logged ? "block" : "hidden"}`} />
            <VscSourceControl
              size={25}
              className={`mx-auto ${activeTab === 1 && hidden === true ? "text-orange-500" : "text-white"} ${logged ? "block" : "hidden"} hover:text-orange-500 transition-all cursor-pointer`}
              onClick={() => switchTab(1)}
            />
            <Bar />

            <BsArrowBarRight
              size={35}
              className={`mx-auto text-white hover:${activeTab === 3 ? "text-white" : "text-orange-500"} transition-all cursor-pointer`}
              onClick={() => {
                setIsHidden(!hidden);
              }}
            />
          </div>
    
          <div className='text-white h-full w-full pl-[3vw] pt-[10vh]'>
            {tab}
          </div>
        </div>
      );
    }
