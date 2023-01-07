// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

let lastCommitTime;

const commitAndPush = async () => {
  console.log("in commitAndPush");
};

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "codex-autocommit" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "codex-autocommit.helloWorld",
    function () {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      vscode.window.showInformationMessage("Hello World from Nephlm!");
    }
  );

  context.subscriptions.push(disposable);

  const commitDisposable = vscode.commands.registerCommand(
    "codex-autocommit.commitAndPush",
    () => {
      // commitAndPush
      console.log("function called");
    }
  );
  context.subscriptions.push(commitDisposable);

  // Run the commit and push task every time the SCM state changes
  const scm = vscode.scm.activeProvider;
  if (scm) {
    scm.onDidChangeState(async () => {
      console.log("onDidChangeState triggered");
      if (!lastCommitTime || Date.now() - lastCommitTime > 1000 * 60 * 0.1) {
        // It has been more than 10 minutes since the last commit
        console.log("passed the date check");
        lastCommitTime = Date.now();
        await commitAndPush();
      }
    });
  }
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
