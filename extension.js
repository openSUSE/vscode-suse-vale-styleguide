// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const dbgChannel = vscode.window.createOutputChannel('VALE-SUSE');


function dbg(msg) {
    dbgChannel.appendLine(`dbg:vale-suse: ${msg}`);
    console.log(`dbg:vale-suse: ${msg}`);
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    // get config obj for Vale plugin and construct path to .vale.ini
    let valeConfig = vscode.workspace.getConfiguration('vale');
    let curValeConfigPath = `${context.extensionPath}/.vale.ini`;
    dbg(`Extension path to .vale.ini :${curValeConfigPath}`);
    // get global storage URI and create if needed
    let globalStorageURI = context.globalStorageUri;
    dbg(`Global storage: ${globalStorageURI.path}`);
    if (fs.existsSync(globalStorageURI.path) == false) {
        dbg(`Global storage ${globalStorageURI.path} does not exists, trying to create`);
        try {
            fs.mkdirSync(globalStorageURI.fsPath);
            dbg(`Global storage directory ${globalStorageURI.path} successfully created`);
        } catch (err) {
            console.error(err);
            return false;
        }
    }
    let globalValeConfigPath = `${globalStorageURI.path}/.vale.ini`;
    dbg(`Global path to .vale.ini :${globalValeConfigPath}`);
    //compile the content of custom .vale.ini
    let valeIni = 'StylesPath = ' + context.extensionPath + '/styles\n' +
        'MinAlertLevel = suggestion\n' +
        '[asciidoctor]\n' +
        'experimental = YES\n' +
        '[*.xml]\n' +
        'Transform = ' + context.extensionPath + '/xslt/vale-docbook.xsl\n' +
        'BasedOnStyles = common, docbook\n' +
        '[*.adoc]\n' +
        'BasedOnStyles = common, asciidoc\n' +
        '[*.{txt,md}]\n' +
        'BasedOnStyles = common\n';
    //write the content of .vale.ini into the global strage file
    fs.writeFileSync(globalValeConfigPath, valeIni);
    valeConfig.update('valeCLI.config', globalValeConfigPath, true);
}
// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
    activate,
    deactivate
}
