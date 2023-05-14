import { default as axios } from "axios"
import Blockly from "blockly"
import { javascriptGenerator } from "blockly/javascript"

axios.get("https://addon.url/blocks/all").then(async (res) => {
    for(const block in res.data) {
        const name = block.name
        const data = block.data

        Blockly.Blocks[name] = {
            init: function() {
                this.jsonInit(data)
            }
        }

        // TODO: Generate Code for imported blocks
        javascriptGenerator[name] = function (block) {}
    }
})