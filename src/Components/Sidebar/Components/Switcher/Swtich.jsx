import { useState } from "react"
import SourceControl from "../SourceControl/SourceControl"
import Files from "../Files/Files"
import Account from "../Account/Account"
import Settings from "../Settings/Settings"


const SOURCE_MATCHER = [
    <Files />,
    <SourceControl />,
    <Account />,
    <Settings />
]

export default function useSwitch() {
    const [current, setCurrent] = useState()

    function setTab(tab) {
        setCurrent(SOURCE_MATCHER[tab])
    }

    return [current, setTab]
}