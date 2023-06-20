// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "suse-vale-styleguide" is now active!');

    // get config obj for vale plugin
    let valeConfiguration = vscode.workspace.getConfiguration("vale");
    // get the current .vale.ini path
    let currentValeIniPath = valeConfiguration.get("valeCLI.config");
    // get info about old vale.ini
    vscode.window.showInformationMessage(currentValeIniPath);

    let suseValeConfigPath = context.extensionPath;
    valeConfiguration.update("valeCLI.config", suseValeConfigPath + "/.vale.ini");
}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
    activate,
    deactivate
}
