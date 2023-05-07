import Blockly from "blockly";
import { javascriptGenerator } from 'blockly/javascript'

const blockName = "eventClientConnected";

const blockData = {
    "message0": "When the bot is connected %1 %2",
    "colour": "#F5AB1A",
    "args0": [
        {
            "type": "input_dummy"
        },
        {
            "type": "input_statement",
            "name": "STATEMENTS"
        }
    ],
    "tooltip": ""
};

Blockly.Blocks[blockName] = {
    init: function() {
        this.jsonInit(blockData);
    }
};

javascriptGenerator[blockName] = function(block) {
    const statements = javascriptGenerator.statementToCode(block, "STATEMENTS");
    const code = `s4d.client.on('ready', async () => {\n${statements}\n});\n`;
    return code;
};