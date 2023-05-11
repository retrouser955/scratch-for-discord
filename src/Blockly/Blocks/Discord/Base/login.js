import Blockly from "blockly";
import { javascriptGenerator } from 'blockly/javascript'

const blockName = "botLogin";


const blockData = {
    "message0": "Connect to Discord using token %1",
    "args0": [
        {
            "type": "input_value",
            "name": "TOKEN",
            "check": [ "String","Env" ]
        }
    ],
    "colour": "#3333ff",
    "tooltip": "Connect your bot to Discord using your bot's token",
    "helpUrl": ""
};


Blockly.Blocks[blockName] = {
    init: function() {
        this.jsonInit(blockData);
    }
};

javascriptGenerator[blockName] = function(block) {
    const value = javascriptGenerator.valueToCode(block, "TOKEN", javascriptGenerator.ORDER_ATOMIC);
    const code = `s4d.client.login(${value}).catch((e) => { 
    const tokenInvalid = true;
    const tokenError = e;
    if (e.toString().toLowerCase().includes("token")) {
        throw new Error("An invalid bot token was provided!")
    } else {
        throw new Error("Privileged Gateway Intents are not enabled! Please go to https://discord.com/developers and turn on all of them.")
    }
});\n`;
return code;
};