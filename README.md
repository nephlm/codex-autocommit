# <img src="https://raw.githubusercontent.com/nephlm/codex-autocommit/main/logo_128.png" width=48 /> Codex Autocommit

VSCode extension to automatically stage and commit changes on an interval.

## Documentation

This extension is not recommended for code.
It was built to support using VSCode as a writing platform.

Every ten minutes (configurable) this extension will
add all new and changed files from the git working tree to the index.
Then commit the changeset to the repo, and if applicable,
push to a remote repository.

Basically, every ten minutes it will push all changes to GitHub
(or whatever remote git provider you use.)

You still need to initialize your git repo
and configure your remotes as per normal.
It just uses the git configuration in the workspace.

### Limitations

* Only works with git.
* Does not support multi-root workspaces.

## Installation

Configure your git in your workspace
by whichever method you normally use.

In VSCode, choose the extension activities
and this extension can be found by searching for `codex`.
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

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Authors

[@nephlm](https://www.github.com/nephlm)

## Logo

by [Lorc](https://lorcblog.blogspot.com) under [CC BY 3.0](http://creativecommons.org/licenses/by/3.0/)