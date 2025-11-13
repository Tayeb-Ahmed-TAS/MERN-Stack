# Git

Git is a tool that helps you manage different versions of your code. It allows you to track changes, revert to previous versions, and collaborate with others.

## Git Configuration

Before using Git, you need to set up your user information. You can do this by running the following commands in your terminal:

```bash

git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Replace `Your Name` and `your.email@example.com` with your actual name and email address. This information will be associated with your commits.

- The following command lists all the Git configuration settings currently set on your machine.

```bash
git config --list
```

## Basic Git Commands

The following table lists some basic Git commands along with their descriptions:

| **Sl** | **Name**           | **Command**                       | **Description**                                                                       |
| ------ | ------------------ | --------------------------------- | ------------------------------------------------------------------------------------- |
| 01     | **Clone**          | `git clone <repository_url>`      | Cloning a repositoru on your local machine                                            |
| 02     | **Status**         | `git status`                      | Displays the state of the code                                                        |
| 03     | **Add**            | `git add <file_name>`             | Adds new or changed files in your working directory to git staging area               |
| 04     | **Add All**        | `git add .`                       | Adds all new or changed files in your working directory to git staging area           |
| 05     | **Commit**         | `git commit -m "Some message"`    | It is the record of change                                                            |
| 06     | **Push**           | `git push origin <branch_name>`   | Upload local repo content to remote repo                                              |
| 07     | **Init**           | `git init`                        | Used to create a new git repo                                                         |
| 08     | **Remote add**     | `git remote add origin <url>`     | Connects your local repo to a remote server                                           |
| 09     | **Remote show**    | `git remote -v`                   | To verify remote                                                                      |
| 10     | **Branch**         | `git branch`                      | To check remote branch                                                                |
| 11     | **Rename branch**  | `git branch -M <new_branch_name>` | To rename the current branch                                                          |
| 12     | **Push to main**   | `git push origin main`            | Pushes the current branch to the main branch on the remote repository                 |
| 13     | **Set u**          | `git push -u origin main`         | Sets the upstream for the current branch to the main branch on the remote repository. |
| 14     | **Simple Push**    | `git push`                        | Pushes changes to the remote repository for the current branch.                       |
| 15     | **Add and Commit** | `git commit -am "Some message"`   | Adds and commits changes in one command                                               |
| 16     | **Pull**           | `git pull origin <branch_name>`   | Fetches and merges changes from the remote repository to your local repository        |
| 17     | **Log**            | `git log`                         | Shows the commit history                                                              |

## Branch Commands

| **Sl** | **Name**                 | **Command**                                    | **Description**                |
| ------ | ------------------------ | ---------------------------------------------- | ------------------------------ |
| 01     | **Check Branch**         | `git branch`                                   | To check branch                |
| 02     | **Rename Branch**        | `git branch -M <new_branch_name>`              | To rename the current branch   |
| 03     | **Navigate**             | `git checkout <branch_name>`                   | To navigate to a branch        |
| 04     | **Create Branch**        | `git checkout -b <branch_name>`                | To create a new branch         |
| 05     | **Delete Branch**        | `git branch -d <branch_name>`                  | To delete a branch from local  |
| 06     | **Delete Remote Branch** | `git push origin --delete <branch_name>`       | To delete a branch from remote |
| 07     | **Push Branch**          | `git push --set-upstream origin <branch_name>` | To push a branch to remote     |

## Merging Code

Merging is the process of combining changes from different branches. To merge a branch into your current branch, use the following command:

| **Command**               | **Description**                                                                             |
| ------------------------- | ------------------------------------------------------------------------------------------- |
| `git diff <branch_name>`  | To compare commits, branches, files & more                                                  |
| `git merge <branch_name>` | To merge 2 branches into the current branch                                                 |
| `git pull`                | To fetch and merge changes from remote repo (It is a straightforward way to merge branches) |

## Pull Request

A **Pull Request (PR)** lets you tell about changes you've pushed to a branch in a repository on GitHub.

To create a pull request:

1. Push your changes to a branch in your remote repository.

2. Go to the repository on GitHub.

3. Click on the "Pull Requests" tab.

4. Click the "New Pull Request" button.

5. Select the branch you pushed your changes to and the branch you want to merge into.

6. Review the changes and click "Create Pull Request".

7. Add a title and description for your pull request, then click "Create Pull Request" again.

Once you've created a pull request, others can review your changes, discuss them, and approve or request modifications before merging them into the main codebase.

## Pull Changes

Used to fetch and download content from a remote repo and immediately uodate the local repo to match that content.

```bash
git pull origin <branch_name>
```

## Merge Conflicts

An event that takes place when Git is unable to automatically resolve differences in code between two commits.

This usually happens when multiple people are working on the same part of a file or when changes have been made to a file in both branches that are being merged. When a merge conflict occurs, Git will mark the file as conflicted and stop the merge process until the conflicts are resolved manually.

To resolve a merge conflict, you need to open the conflicted file and look for the conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`). These markers indicate the conflicting changes from each branch. You will need to decide which changes to keep, modify, or combine, and then remove the conflict markers.

After resolving the conflicts, you need to stage the changes using `git add <file_name>` and then commit the merge using `git commit`. Once the merge is committed, you can continue working with your code as usual.

Then you can push the resolved changes to the remote repository using `git push origin <branch_name>` or `git push`.

## Fixing Mistakes

- **Case 1 :** Staged changes

If you have staged changes that you want to unstage, you can use the following command:

```bash
git reset <file_name>
```

For unstaging all staged files, you can use:

```bash
git reset
```

This command will unstage the specified file, moving it back to the working directory without discarding any changes.

- **Case 2 :** Committed changes (for one commit)

If you have committed changes that you want to undo, you can use the following command to revert to the previous commit while keeping your changes in the working directory:

```bash
git reset HEAD~1
```

This command will move the HEAD pointer back by one commit, effectively undoing the last commit but preserving the changes in your working directory.

- **Case 3 :** Committed changes (for many commits)

If you want to undo multiple commits, you can specify the number of commits to go back. For example, to undo the last three commits, you can use:

```bash
git reset HEAD~3
```

Here, `3` will change based on how many commits you want to undo. This command will move the HEAD pointer back by the specified number of commits, keeping your changes in the working directory.

### or

```bash
git reset <commit_hash>
```

This command will reset your repository to the specified commit hash, effectively undoing all commits made after that commit while preserving the changes in your working directory.

### or

```bash
git reset --hard <commit_hash>
```

This command will reset your repository to the specified commit hash and discard all changes made after that commit. Use this command with caution, as it will permanently delete any changes made after the specified commit.

**Note:** `<commit_hash>` can be found using the `git log` command, which displays the commit history along with their hashes. It is the commit id shown in the log. like, `3202752b6ad051f51c9035ee0df37094e47f1118`

## Forking

A **fork** is a new repository that shares code and visibility settings with the original **upstream** repository.

**Fork** is a rough copy.

You can fork a repository by clicking the "Fork" button on the repository's GitHub page. This will create a copy of the repository under your GitHub account, allowing you to make changes without affecting the original repository.

You can then clone your forked repository to your local machine, make changes, and push them back to your forked repository on GitHub. If you want to contribute your changes back to the original repository, you can create a pull request from your forked repository to the upstream repository.
