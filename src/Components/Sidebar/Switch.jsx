import { useState } from "react"
import SourceControl from "./Tabs/SourceControl"
import Files from "./Tabs/Files"
import Account from "./Tabs/Account"
import Settings from "./Tabs/Settings"
import Marketplace from "./Tabs/Marketplace"
import Links from "./Tabs/Links"
import Misc from "./Tabs/Misc"

const SOURCE_MATCHER = [
    <Files />,
    <SourceControl />,
    <Account />,
    <Settings />,
    <Marketplace />,
    <Links />,
    <Misc />
]

export default function useSwitch() {
    const [current, setCurrent] = useState()

    function setTab(tab) {
        setCurrent(SOURCE_MATCHER[tab])
    }

    return [current, setTab]
}