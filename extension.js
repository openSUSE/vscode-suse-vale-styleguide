// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require('path');
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
    dbg("Activating extension");
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

    // Handle custom ignore list
    const customIgnoreListPath = vscode.workspace.getConfiguration('suse-vale').get('custom.ignorelist');
    dbg(`Custom ignore list path from config: ${customIgnoreListPath}`);
    if (customIgnoreListPath) {
        const spellingYamlPath = path.join(context.extensionPath, 'styles', 'common', 'Spelling.yml');
        dbg(`Spelling.yml path: ${spellingYamlPath}`);
        try {
            // Read the content of Spelling.yml
            let spellingYamlContent = fs.readFileSync(spellingYamlPath, 'utf8');
            // Define a regex to find the 'ignore:' section in the YAML file
            const ignoreSectionRegex = /ignore:\s*([\s\S]*?)(?=\n\S|$)/;
            // Check if the 'ignore:' section exists
            const ignoreSectionExists = spellingYamlContent.match(ignoreSectionRegex);

            // If the 'ignore:' section does not exist
            if (!ignoreSectionExists) {
                dbg(`Ignore section not found in Spelling.yml. Creating it.`);
                // Create the 'ignore:' section and add the custom ignore list path
                spellingYamlContent += `\nignore:\n  - ${customIgnoreListPath}\n`;
            } else {
                // If the 'ignore:' section exists
                const match = spellingYamlContent.match(ignoreSectionRegex);
                if (match) {
                    // Split the existing ignore list into an array of lines and trim whitespace
                    let existingIgnoreList = match[1].trim().split('\n').map(line => line.trim());
                    dbg(`Existing ignore list: ${existingIgnoreList}`);
                    // Remove empty strings and extra '-' from the list, to clean up the list
                    existingIgnoreList = existingIgnoreList.filter(item => item !== '').map(item => item.replace(/^- /, ''));
                    // Remove duplicate entries, to clean up the list
                    existingIgnoreList = [...new Set(existingIgnoreList)];

                    // If the custom ignore list path is not in the existing list
                    if (!existingIgnoreList.includes(customIgnoreListPath)) {
                        dbg(`Adding custom ignore list path to Spelling.yml: ${customIgnoreListPath}`);
                        // Add the custom ignore list path to the list
                        existingIgnoreList.push(customIgnoreListPath);
                        
                    } else {
                        dbg(`Custom ignore list path already exists in Spelling.yml.`);
                    }
                    // Add the '- ' prefix to each item and join the list into a string
                    const updatedIgnoreList = existingIgnoreList.map(item => `- ${item}`).join('\n  ');
                    // Replace the old ignore section with the updated one
                    spellingYamlContent = spellingYamlContent.replace(ignoreSectionRegex, `ignore:\n  ${updatedIgnoreList}`);
                }
            }
            fs.writeFileSync(spellingYamlPath, spellingYamlContent);
        } catch (err) {
            console.error(err);
            vscode.window.showErrorMessage(`Failed to update Spelling.yml: ${err.message}`);
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
    dbg(`Global .vale.ini written to ${globalValeConfigPath}`);
    valeConfig.update('valeCLI.config', globalValeConfigPath, true);
}
// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
    activate,
    deactivate
}
