const vscode = require('vscode');
const path = require('node:path');
const fs = require('node:fs');
const { LanguageClient, ErrorAction, CloseAction } = require('vscode-languageclient/node');

let client;
let restarting;

async function activate(context) {
    const output = vscode.window.createOutputChannel('SystemVerilog LSP');
    const watcher = vscode.workspace.createFileSystemWatcher('**/*');
    context.subscriptions.push(output, watcher);
    const executable = context.asAbsolutePath(path.join('bin', process.platform === 'win32' ? 'sv-lsp.exe' : 'sv-lsp'));
    let failures = 0;
    client = new LanguageClient('systemverilogLsp', 'SystemVerilog LSP',
        { command: executable, args: [], options: { env: process.env } }, {
            documentSelector: [
                { scheme: 'file', language: 'verilog' },
                { scheme: 'file', language: 'systemverilog' },
            ],
            outputChannel: output,
            synchronize: { fileEvents: watcher },
            errorHandler: {
                error: () => ({ action: ErrorAction.Shutdown }),
                closed: () => {
                    failures += 1;
                    if (failures <= 3) return { action: CloseAction.Restart };
                    output.appendLine('Server stopped repeatedly. Run SystemVerilog LSP: Restart after checking this output.');
                    vscode.window.showErrorMessage('SystemVerilog LSP stopped repeatedly. See the SystemVerilog LSP output channel.');
                    return { action: CloseAction.DoNotRestart };
                },
            },
        });
    async function start() {
        try {
            await fs.promises.access(executable, process.platform === 'win32' ? fs.constants.F_OK : fs.constants.X_OK);
            await client.start();
        } catch (error) {
            output.appendLine(`Could not launch ${executable}: ${error.stack || error.message}`);
            vscode.window.showErrorMessage(`SystemVerilog LSP could not start. Reinstall the extension for ${process.platform}-${process.arch} and check the SystemVerilog LSP output channel.`);
        }
    }
    context.subscriptions.push(vscode.commands.registerCommand('verilogLsp.restart', async () => {
        if (restarting) return restarting;
        restarting = (async () => {
            try { await client.stop(); failures = 0; await start(); }
            catch (error) { output.appendLine(error.stack || error.message); }
            finally { restarting = undefined; }
        })();
        return restarting;
    }));
    await start();
}
async function deactivate() {
    if (restarting) await restarting;
    if (client) await client.stop();
}
module.exports = { activate, deactivate };
