---
title: Managing multiple Git identities
date: 2024-10-06T03:08:03+02:00
tags: [git, dotfiles]
---

I have multiple Git identities (personal/school/work), and having to
manually specify which to use each time quickly got tedious.
Luckily, [Git has conditional includes](https://git-scm.com/docs/git-config#_conditional_includes).

Initially, I used [`gitdir/i`](https://git-scm.com/docs/git-config#Documentation/git-config.txt-codegitdiricode) to include the relevant configuration file
based on the repository's case-insensitive path:

```toml
# ~/.config/git/config
[includeIf "gitdir/i:personal/"]
	path = "config.d/personal"
[includeIf "gitdir/i:school/"]
	path = "config.d/school"

# ~/.config/git/config.d/personal
[user]
	email = name@provider.tld

# ~/.config/git/config.d/school
[user]
	email = name@school.tld
```

However, since [Git 2.36.0](https://raw.githubusercontent.com/git/git/master/Documentation/RelNotes/2.36.0.txt) I use a combination of [`hasconfig:remote.*.url`](https://git-scm.com/docs/git-config#Documentation/git-config.txt-codehasconfigremoteurlcode) and
SSH's `Host` keyword to include based on the remote's URL:

```toml
# ~/.config/git/config
[includeIf "hasconfig:remote.*.url:github-personal:**/**"]
	path = config.d/personal
[includeIf "hasconfig:remote.*.url:github-school:**/**"]
	path = config.d/school
```

```ini
# ~/.ssh/config
Host github-*
    User git
    Hostname github.com
    IdentityFile ~/.ssh/keys/github
```

With this, using an identity is just a matter of
`git clone github-personal:…`.
