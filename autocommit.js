import * as vscode from 'vscode';

let lastCommitTime: number | undefined;

const commitAndPush = async () => {
    const scm = vscode.scm.activeProvider;
    if (!scm) {
        return;
    }

    const state = scm.state;
    const dirtyFiles = Array.from(state.values())
        .filter(s => s.modified || s.staged || s.conflict);

    if (dirtyFiles.length > 0) {
        const message = `Committing ${dirtyFiles.length} dirty files`;
        const progress = vscode.window.createProgressIndicator();
        progress.title = message;

        progress.begin(dirtyFiles.length);

        // Add dirty files to the staging area
        await scm.inputBox.value = 'Committing dirty files';
        for (const file of dirtyFiles) {
            scm.stage(file.resourceUri);
            progress.increment();
        }

        // Commit the staged changes
        await scm.inputBox.value = 'Committing changes';
        await scm.commit();

        // Push the changes to the remote repository
        await scm.inputBox.value = 'Pushing changes';
        await scm.push();

        progress.done();
        vscode.window.showInformationMessage(`${message} successful`);
    }
};

export function activate(context: vscode.ExtensionContext) {
    // Register a command that can be triggered from the command palette
    const disposable = vscode.commands.registerCommand(
        'extension.commitAndPush',
        commitAndPush
    );
    context.subscriptions.push(disposable);

    // Run the commit and push task every time the SCM state changes
    const scm = vscode.scm.activeProvider;
    if (scm) {
        scm.onDidChangeState(async () => {
            if (!lastCommitTime || Date.now() - lastCommitTime > 1000 * 60 * 10) {
                // It has been more than 10 minutes since the last commit
                lastCommitTime = Date.now();
                await commitAndPush();
            }
        });
    }
}

export function deactivate() {}
