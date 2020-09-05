
import * as cp from 'child_process';
import * as vs from 'vscode';

/**
 * Responsible to format the given file in path
 */
export class HCL {
    private config: vs.WorkspaceConfiguration;
    private hclPath: string;

    constructor(config: vs.WorkspaceConfiguration) {
        this.config = config;
        this.hclPath = this.config.get('path', 'hclfmt');
    }

    /**
     * Formats the given file with hclfmt binary
     * please visit https://github.com/fatih/hclfmt
     * and install this binary
     */
    async document(path: string): Promise<Number> {
        let process = cp.spawn(this.hclPath, ["-w", path]);
        return new Promise((resolve, reject) => {
            process.on('close', (code: Number) => {
                if (code !== 0) {
                    reject(code);
                } else {
                    resolve(code);
                }
            });
        })
    }
}