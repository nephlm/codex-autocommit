# <img src="https://raw.githubusercontent.com/nephlm/codex-autocommit/main/logo_128.png" width=48> Codex Autocommit

VSCode extension to automatically stage and commit changes on an interval.

## Documentation

This extension is not particularly the best practice for code,
it was built to support using VSCode as a writing platform.

Every ten minutes (configurable) this extension will
add all new and changed files from the git working tree to the index.
Then commit the changeset to the repo, and if applicable,
push to a remote repository.

Which is the detailed version of: *Every ten minutes, it will push all changes to GitHub (or whatever remote git provider you use.)*

### Limitations

* Only works with git.
* Does not support multi-root workspaces.
* It adds, commit and pushes everything in the workspace (unless excluded by .gitignore), do not create files in the workspace with sensitive information (passwords, credit card numbers, etc.) while autocommit is active.

## Getting Started

You still need to initialize your git repo
and configure your remotes as per normal.
It just uses the git configuration in the workspace.

(Github)[https://github.com] has spent a lot of time and resources on explaining version control and how to set it up for your work than I ever will, so instead of trying I'll point to their hard work.

* [What is Git/Version Control](https://git-scm.com/doc)
* [Setting up Git](https://docs.github.com/en/get-started/quickstart/set-up-git)
* [Creating a Repo](https://docs.github.com/en/get-started/quickstart/create-a-repo)
* [Create a Repo from Existing directory](https://docs.github.com/en/get-started/importing-your-projects-to-github/importing-source-code-to-github/adding-locally-hosted-code-to-github)
* [Getting started with Git](https://docs.github.com/en/get-started/getting-started-with-git)
* [Git and VSCode](https://code.visualstudio.com/docs/sourcecontrol/overview)
* [Ignoring Files](https://docs.github.com/en/get-started/getting-started-with-git/ignoring-files)

## Installation

Configure your git in your workspace
by whichever method you normally use.

In VSCode, choose the extension activities
and this extension can be found by searching for `codex-autocommit`.
Click the `install` button, and you're off to the races.

## Configuration

By default, this extension doesn't do anything,
you'll need to at least set `codex-autocommit.active` to `true`
before it will start working.

There are two settings for this extension.

`codex-autocommit.active`  

By default this is off,
and should probably be activated on a per-workspace basis.

`codex-autocommit.intervalMinutes`

How many minutes the extension will sleep between autocommits.

## Feedback

For feature request, comments or bug reports, please create an [issue on Github](https://github.com/nephlm/codex-autocommit/issues)

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Related

Here are some other VSCode extensions I wrote to support my
writing instead of writing.

[Codex Autocommit](https://marketplace.visualstudio.com/items?itemName=ZenBrewismBooks.codex-autocommit&ssr=false#overview) -
Automatically take a snapshot of the manuscript every interval and store it on a remote git server.

[Codex Manuscript File Operations](https://marketplace.visualstudio.com/items?itemName=ZenBrewismBooks.codex-manuscript-file-operations) - A set of file operations to facilitate splitting and merging scenes and to maintaining the fileorder of the manuscript.

[Codex Manuscript Wordcount](https://marketplace.visualstudio.com/items?itemName=ZenBrewismBooks.codex-manuscript-wordcount) - Show whole manuscript word counts and set manuscript and writing session targets.

## Authors

[@nephlm](https://www.github.com/nephlm)

## Logo

by [Lorc](https://game-icons.net/1x1/lorc/letter-bomb.html) under [CC BY 3.0](http://creativecommons.org/licenses/by/3.0/)
