import { backUpFilesToLocal, loadFilesFromLocal } from "./FileTools";
import Blockly from "blockly"

export function switchFiles(fileName, reload, reloader, dontReloadDom, backup) {
    loadFilesFromLocal()

    // save file to workspace
    const main = window.currentFile

    const currentJSON = Blockly.serialization.workspaces.save(Blockly.getMainWorkspace())

    console.log(currentJSON)

    if(main === "index") {
        window.files.index = currentJSON
    } else {
        window.files.commands[main] = currentJSON
    }

    if(backup) backUpFilesToLocal()

    if(fileName === "index") {
        Blockly.serialization.workspaces.load(window.files.index, Blockly.getMainWorkspace())
    } else {
        Blockly.serialization.workspaces.load(window.files.commands[fileName] || {}, Blockly.getMainWorkspace())
    }

    window.currentFile = fileName

    // reload the DOM

    if(!dontReloadDom) reload(!reloader)
}