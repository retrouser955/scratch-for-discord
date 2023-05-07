import Blockly from "blockly"

const DarkTheme = Blockly.Theme.defineTheme('scratch-for-discord', {
    'name': 'true_dark',
    'base': Blockly.Themes.Classic,
    'componentStyles': {
        'workspaceBackgroundColour': '#030303',
        'toolboxBackgroundColour': '#121212',
        'toolboxForegroundColour': '#fff',
        'flyoutBackgroundColour': '#121212',
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