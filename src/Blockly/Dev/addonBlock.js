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

        javascriptGenerator[name] = async function (blockData) {
            const { data } = await axios.get(`https://addon.url/blocks/data/${name}`)

            let requestData = {}

            for(const arg of data.args0) {
                if(arg.type === "input_dummy") continue

                requestData[arg.name] = javascriptGenerator.valueToCode(block, arg.name, javascriptGenerator.ORDER_ATOMIC)
            }

            const code = await axios.get(`https://addon.url/code/${name}`, {
                params: requestData
            })

            return code
        }
    }
})