'use strict';
import * as vscode from 'vscode';
import { HCL } from './hcl';

export async function activate(context: vscode.ExtensionContext) {
    let config = vscode.workspace.getConfiguration('hclfmt');
    let formatter = new HCL(config);

    let fmt = (doc: vscode.TextDocument) => {
        formatter.document(doc.fileName).catch((err) => {
            vscode.window.showErrorMessage("hclfmt: error " + err);
        });
    };

    vscode.workspace.onDidSaveTextDocument(fmt);

    // apply the format operation on save event.
    context.subscriptions.push(vscode.commands.registerCommand('extension.hclfmt', () => {
        // get the current active document and 
        // and apply the formater now.
        let editor = vscode.window.activeTextEditor;
        if (editor) {
            fmt(editor.document);
        }
    }));
}

export function deactivate() {
}