import Blockly from "blockly"

const DarkTheme = Blockly.Theme.defineTheme('scratch-for-discord', {
    'name': 'true_dark',
    'base': Blockly.Themes.Classic,
    'componentStyles': {
        'workspaceBackgroundColour': '#1a1a1a',
        'toolboxBackgroundColour': '#262626',
        'toolboxForegroundColour': '#fff',
        'flyoutBackgroundColour': '#262626',
        'flyoutForegroundColour': '#ccc',
        'flyoutOpacity': .6,
        'scrollbarColour': '#797979',
        'insertionMarkerColour': '#fff',
        'insertionMarkerOpacity': 0.3,
        'scrollbarOpacity': 0.3,
        'cursorColour': '#d0d0d0',
    },
});

export default DarkTheme