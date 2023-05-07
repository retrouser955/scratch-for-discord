import Blockly from "blockly"
import DarkTheme from "../Blockly/theme"

const createBlocklyWorkspace = (div, toolbox) => {
  const blocklyMainWorkspace = Blockly.inject(div, {
    toolbox: toolbox,
    renderer: 'zelos',
    theme: DarkTheme,
    grid: {
      spacing: 20,
      length: 3,
      colour: "#c7c6c5",
      snap: true
    },
    zoom: {
      controls: true,
      startScale: 0.9,
      maxScale: 3,
      minScale: 0.3,
      scaleSpeed: 1.2
    },
    readOnly: false,
    move: {
      scrollbars: true,
      drag: true,
      wheel: true
    },
    CSS: false,
  })
  return blocklyMainWorkspace
}

export default createBlocklyWorkspace