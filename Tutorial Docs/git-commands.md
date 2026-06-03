# Git CLI Quick Reference

## Setup

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

---

## Status & History

```bash
git status                  # see what's changed/staged
git log --oneline           # compact commit history
git diff                    # see unstaged changes
git diff --staged           # see staged changes
```

---

## Staging & Committing

```bash
git add .                   # stage all changes
git add filename.txt        # stage a specific file
git commit -m "your message"
git commit --amend -m "fix message"   # fix the last commit message (before pushing)
```

---

## Pushing & Pulling

```bash
git push                    # push current branch to remote
git push origin main        # push to a specific branch on remote
git pull                    # fetch and merge remote changes
git fetch                   # fetch remote changes without merging
```

---

## Overwrite Local with Remote (discard local changes)

```bash
git fetch origin
git reset --hard origin/main    # wipe local changes, match remote exactly
```

> Warning: this permanently discards any uncommitted local work.

---

## Overwrite Remote with Local (force push)

```bash
git push --force origin main
```

> Warning: this overwrites the remote branch. Don't do this on shared branches.

---

## Branches

```bash
git branch                          # list local branches
git branch -a                       # list all branches (including remote)
git branch my-feature               # create a new branch
git checkout my-feature             # switch to a branch
git checkout -b my-feature          # create and switch in one step
git push -u origin my-feature       # push a new branch to remote
git branch -d my-feature            # delete a branch (safe — won't delete if unmerged)
git branch -D my-feature            # force delete a branch
```

---

## Merging

```bash
git checkout main
git merge my-feature                # merge a branch into current branch
```

---

## Undoing Things

```bash
git restore filename.txt            # discard unstaged changes to a file
git restore --staged filename.txt   # unstage a file (keep changes)
git revert HEAD                     # create a new commit that undoes the last commit
git reset --hard HEAD~1             # delete the last commit entirely (destructive)
```

---

## Stashing (save work temporarily)

```bash
git stash                           # stash uncommitted changes
git stash pop                       # reapply the stash
git stash list                      # see all stashes
git stash drop                      # delete the most recent stash
```

---

## Cloning & Remotes

```bash
git clone https://github.com/user/repo.git
git remote -v                       # see configured remotes
git remote add origin <url>         # add a remote
git remote set-url origin <url>     # change the remote URL
```
