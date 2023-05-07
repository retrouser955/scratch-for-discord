import { useState } from "react"
import SourceControl from "../SourceControl/SourceControl"
import Files from "../Files/Files"
import Account from "../Account/Account"

const SOURCE_MATCHER = [
    <Files />,
    <SourceControl />,
    <Account />
]

export default function useSwitch() {
    const [current, setCurrent] = useState()

    function setTab(tab) {
        setCurrent(SOURCE_MATCHER[tab])
    }

    return [current, setTab]
}