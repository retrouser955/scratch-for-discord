import syncFetch from "../../helpers/syncFetch"
import Blockly from "blockly"
import { javascriptGenerator } from "blockly/javascript"

// TODO: remove the old system after new push from godslayerakp#3587

axios.get("https://addon.url/blocks/all").then(async (res) => {
    for(const block in res.data) {
        const name = block.name
        const data = block.data

        Blockly.Blocks[name] = {
            init: function() {
                this.jsonInit(data)
            }
        }

        javascriptGenerator[name] = function (blockData) {
            const data = syncFetch(`https://addon.url/blocks/data/${name}`)

            let requestData = {}

            for(const arg of data.args0) {
                if(arg.type === "input_dummy") continue

                requestData[arg.name] = javascriptGenerator.valueToCode(block, arg.name, javascriptGenerator.ORDER_ATOMIC)
            }

            let transportString = []

            for(let token of Object.keys(requestData)) {
                transportString.push(encodeURIComponent(`${token}=${requestData[token]}`))
            }

            const code = syncFetch(`https://addon.url/code/${name}?${transportString.join("&")}`)

            return code
        }
    }
})