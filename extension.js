// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    // get config obj for Vale plugin and construct path to .vale.ini
    let valeConfig = vscode.workspace.getConfiguration('vale');
    let curValeConfigPath = context.extensionPath + '/.vale.ini';
    console.log('Extension path to .vale.ini :' + curValeConfigPath);
    // get global storage URI and create if needed
    let globalStorageURI = context.globalStorageUri;
    console.log('Global storage: ' + globalStorageURI.path);
    if (fs.existsSync(globalStorageURI.path) == false) {
        fs.mkdir(globalStorageURI.path);
    }
    let globalValeConfigPath = globalStorageURI.path + '/.vale.ini';
    console.log('Global path to .vale.ini :' + globalValeConfigPath);
    //compile the content of custom .vale.ini
    let valeIni = 'StylesPath = ' + context.extensionPath + '\n' +
        'MinAlertLevel = suggestion\n' +
        '[asciidoctor]\n' +
        'experimental = YES\n' +
        '[*.xml]\n' +
        'Transform = ' + context.extensionPath + '/xslt/vale-docbook.xsl\n' +
        'BasedOnStyles = styles\n' +
        '[*.html]\n' +
        'BasedOnStyles = styles\n' +
        '[*.{ md, txt, adoc }]\n' +
        'BasedOnStyles = styles';
    //write the content of .vale.ini into the global strage file
    fs.writeFileSync(globalValeConfigPath, valeIni);
    valeConfig.update('valeCLI.config', globalValeConfigPath);
}
// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
    activate,
    deactivate
}
