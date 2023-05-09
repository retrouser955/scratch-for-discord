import Blockly from "blockly"
import { javascriptGenerator } from 'blockly/javascript'

export function generateMainFileContent() {
    const { index } = localStorage.getItem("workspace")

    const headlessWorkspace = new Blockly.Workspace()

    Blockly.serialization.workspaces.load(JSON.parse(index), headlessWorkspace)

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
    const { commands } = localStorage.getItem('workspace')

    const headless = new Blockly.Workspace()

    const returnCmd = {}

    for(const command in commands) {
        Blockly.serialization.workspaces.load(JSON.parse(commands[command], headless))

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