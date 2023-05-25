import Blockly from "blockly"
import JSZip from 'jszip'
import { javascriptGenerator } from 'blockly/javascript'

export function generateMainFileContent() {
    const { index } = JSON.parse(localStorage.getItem("workspace"))

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
const { commands } = JSON.parse(localStorage.getItem('workspace'))

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

export async function downloadZip(main,cmds,json,workspace) {
    const zip = new JSZip();
if (main) zip.file('index.js', generateMainFileContent());
if (json) //package.json
if (workspace) zip.file('blocks.json', localStorage.getItem("workspace"));
if (cmds) {
    var commands = generateCommandContent()
    const folder = zip.folder('commands');
    Object.entries(commands).forEach(([key, value]) => {
        folder.file(`${key}.js`, value);
      });
    }

    const content = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    // make this workspace name when feature comes out
    link.download = `${localStorage.getItem("projectName") || "Untitled Project"}.zip`
    link.click();
    URL.revokeObjectURL(link.href);
}