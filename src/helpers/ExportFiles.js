import Blockly from "blockly"
import { javascriptGenerator } from 'blockly/javascript'

export function generateMainFileContent() {
    var index = JSON.parse(localStorage.getItem("workspace")).index
    console.log(index)
    const headlessWorkspace = new Blockly.Workspace()

    Blockly.serialization.workspaces.load(index, headlessWorkspace)

    const javascriptCode = javascriptGenerator.workspaceToCode(headlessWorkspace)

    const code = 
        `(async () => {
            const Discord = require("discord.js")
            const { Client, GatewayIntentBits } = Discord

            const s4d = {
                client: new Client({
                    intents: [...Object.values(GatewayIntentBits)]
                })
            }

            ${javascriptCode}
        })()`

    return code
}

export function generateCommandContent() {
    var commands = JSON.parse(localStorage.getItem("workspace")).commands
    const headless = new Blockly.Workspace()

    const returnCmd = {}

    for(const command in commands) {
        Blockly.serialization.workspaces.load(commands[command], headless)

        const code =
            `const Discord = require('discord.js')
            
            module.exports = {
                name: ${command},
                run: async (s4d, message) => {
                    ${javascriptGenerator.workspaceToCode(headless)}
                }
            }`

        returnCmd[command] = code
    }

    return returnCmd
}