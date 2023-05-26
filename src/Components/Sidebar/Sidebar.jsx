import React, { useState, useEffect } from 'react';
import { GoFileSubmodule } from "react-icons/go"
import { RiAccountCircleFill } from "react-icons/ri"
import { VscSourceControl } from "react-icons/vsc"
import { BsArrowBarRight } from "react-icons/bs"
import {IoSettingsSharp} from "react-icons/io5"
import useSwitch from "./Components/Switcher/Swtich"
import {AiOutlineShop} from "react-icons/ai"
import {BiEdit, BiLink} from "react-icons/bi"
import {MdMiscellaneousServices} from "react-icons/md"
function Bar({ className }) {
    if (!className) className = ""
        return <div className={`bg-white h-[2px] w-[80%] rounded-sm mx-auto my-2 ${className}`} />
}

export default function Sidebar({ setIsHidden, hidden }) {
    const [tab, setTab] = useSwitch()
    const [activeTab, setActiveTab] = useState(0);
    useEffect(() => {
        setTab(0)
        setIsHidden(false)
    }, [])
    const switchTab = (index) => {
      if (index === activeTab || hidden === false) {
        setIsHidden(!hidden);
      }
        setActiveTab(index);
        setTab(index);
      };
      const userData = localStorage.getItem("userData");
      let logged = userData ? true : false;
      return (
        <div className="w-[15vw] bg-neutral-900 top-0 absolute left-0 h-screen">
          <div className="absolute left-0 h-full w-[3vw] bg-neutral-800 pt-[10vh] top-0">
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
            <IoSettingsSharp size={25} className={`mx-auto ${activeTab === 3 && hidden === true ? "text-orange-500" : "text-white"} hover:text-orange-500 transition-all cursor-pointer`} onClick={() => switchTab(3)} />
            <Bar />
            <AiOutlineShop size={25} className={`mx-auto ${activeTab === 4 && hidden === true ? "text-orange-500" : "text-white"} hover:text-orange-500 transition-all cursor-pointer`} onClick={() => switchTab(4)} />
            <Bar />
            <BiLink size={25} className={`mx-auto ${activeTab === 5 && hidden === true ? "text-orange-500" : "text-white"} hover:text-orange-500 transition-all cursor-pointer`} onClick={() => switchTab(5)} />
            <Bar />
            <MdMiscellaneousServices size={25} className={`mx-auto ${activeTab === 6 && hidden === true ? "text-orange-500" : "text-white"} hover:text-orange-500 transition-all cursor-pointer`} onClick={() => switchTab(6)} />
            <Bar className={`${hidden ? "block" : "hidden"}`} />
            <BsArrowBarRight size={25} className={`${hidden ? "block" : "hidden"} mx-auto text-white hover:text-orange-500 transition-all cursor-pointer`} onClick={() => setIsHidden(!hidden)} />

          </div>
    
          <div className='text-white h-full w-full pl-[3vw] pt-[10vh]'>
            {tab}
          </div>
        </div>
      );
    }
