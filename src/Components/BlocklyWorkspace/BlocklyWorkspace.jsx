import './BlocklyWorkspace.css'
import { useCallback, useRef } from 'react'
import Blockly from "blockly"
import createBlocklyWorkspace from '../../helpers/createBlocklyWorkspace'
import toolbox from "../../Blockly/toolbox"

// Load the blocks

// For cleaner code, every block will be loaded in "../../Blockly/Blocks/index.js" as I do not want to flood this file
import "../../Blockly/Blocks/index.js"

export default function BlocklyWorkspace({ hidden }) {
    const isHidden = useRef()

    const blocklyInjection = useCallback((div) => {
        if(!div) return

        const mainWorkspace = Blockly.getMainWorkspace()

        div.innerHTML = ""
        
        const injectionDiv = document.createElement('div')
        
        const { classList } = injectionDiv
        classList.add('h-full')
        classList.add('w-full')

        div.append(injectionDiv)

        if(mainWorkspace) {
            var currentJSON = Blockly.serialization.workspaces.save(mainWorkspace)
            var { scrollX, scrollY } = mainWorkspace
            var isToolboxHidden = mainWorkspace.toolbox_.isVisible_
        }

        const newWorkspace = createBlocklyWorkspace(injectionDiv, toolbox)
        
        newWorkspace.getToolbox().setVisible(isToolboxHidden || true)

        if(currentJSON) {
            Blockly.serialization.workspaces.load(currentJSON, newWorkspace)
            newWorkspace.scroll(scrollX, scrollY)
        }

        newWorkspace.addChangeListener(Blockly.Events.disableOrphans)

        isHidden.current = hidden ? "w-[97vw]" : "w-[85vw]"
        newWorkspace.getToolbox().setVisible(!hidden)
    })

    return (
        <div className={`absolute h-[90vh] ${isHidden.current || "w-[85vw]"} bottom-0 right-0`} ref={blocklyInjection}></div>
    )
}
