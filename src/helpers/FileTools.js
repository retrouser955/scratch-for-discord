export function backUpFilesToLocal() {
    const { files } = window

    if(!files) return

    const { index, commands } = files

    localStorage.setItem("workspace", JSON.stringify({
        index,
        commands
    }))
}

export function loadFilesFromLocal() {
    const files = JSON.parse(localStorage.getItem("workspace")) ?? {}

    const { index, commands } = files

    if(typeof window.files != "object") window.files = {}

    if(typeof window.files.commands != 'object') window.files.commands = {}

    window.files.index = index

    window.files.commands = commands || {}
}