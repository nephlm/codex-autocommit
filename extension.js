// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

let timeoutId;

const commitAndPush = async () => {
  const gitExtensionHandle = vscode.extensions.getExtension("vscode.git");
  if (!gitExtensionHandle.isActive) {
    console.log("git extension not active, activating");
    gitExtensionHandle.activate().then(() => {
      console.log("git extension activated");
      timeoutId = setTimeout(commitAndPush, 10 * 1000);
    });
    console.log("Sleeping for 10 seconds.");
    return;
  }

  const workspaceConfig = vscode.workspace.getConfiguration("codex-autocommit");
  console.log("Codex Autocommit active: " + workspaceConfig.get("active"));
  console.log(
    "Codex Autocommit interval: " +
      workspaceConfig.get("intervalMinutes") +
      "min"
  );
  if (!workspaceConfig.get("active")) {
    console.log("Codex Autocommit is not active; Exiting");
    return;
  }

  const api = gitExtensionHandle.exports.getAPI(1);
  console.log("git extension state is: " + api.state);
  if (api.state != "initialized") {
    console.log("git extension not initialized");
    timeoutId = setTimeout(commitAndPush, 10 * 1000);
    console.log("Sleeping for 10 seconds");
    return;
  }

  const setNext = function () {
    const sleepMinutes = workspaceConfig.get("intervalMinutes");
    timeoutId = setTimeout(commitAndPush, sleepMinutes * 60 * 1000);
    console.log(
      "commitAndPush complete, sleeping for " + sleepMinutes + " minutes"
    );
  };

  const check_push = function (repository) {
    if (repository.state.remotes.length) {
      console.log("Pushing Changes");
      var push_promise = repository.push();
      push_promise.then(() => {
        setNext();
      });
    } else {
      console.log("No remote to push to.");
      setNext();
    }
  };

  const check_commit = function (repository) {
    if (repository.state.indexChanges.length) {
      console.log("Committing changes.");
      const date = new Date();
      const iso_string = date.toISOString();
      var commitPromise = repository.commit(
        iso_string + ": " + repository.inputBox.value
      );
      commitPromise.then(check_push(repository));
    } else {
      console.log("Nothing to commit.");
      check_push(repository);
    }
  };

  const repository = api.repositories[0];
  await repository.status();

  var modified = repository.state.workingTreeChanges.map((item) => {
    return item.uri.path;
  });

  const changed = modified.concat(
    repository.repository.untrackedGroup.resourceStates.map((item) => {
      return item.resourceUri.path;
    })
  );

  var addPromise;
  console.log(changed);

  if (changed.length) {
    console.log("Staging Files");
    addPromise = repository.add(changed);
    addPromise.then(() => check_commit(repository));
  } else {
    console.log("Working Tree is clean.");
    check_commit(repository);
  }
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

  // Run the commit and push task every time the SCM state changes
  // const scm = vscode.scm.activeSourceControl;

  const commitDisposable = vscode.commands.registerCommand(
    "codex-autocommit.commitAndPush",
    () => {
      commitAndPush();
      console.log("commit and push manual command called");
    }
  );
  context.subscriptions.push(commitDisposable);

  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (
        e.affectsConfiguration("codex-autocommit.active") ||
        e.affectsConfiguration("codex-autocommit.intervalMinutes")
      ) {
        console.log("Configuraton changed; restarting");
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(commitAndPush, 10 * 1000);
      }
    })
  );

  commitAndPush();
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
