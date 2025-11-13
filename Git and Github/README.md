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

| **Sl** | **Name**          | **Command**                       | **Description**                                                             |
| ------ | ----------------- | --------------------------------- | --------------------------------------------------------------------------- |
| 01     | **Clone**         | `git clone <repository_url>`      | Cloning a repositoru on your local machine                                  |
| 02     | **Status**        | `git status`                      | Displays the state of the code                                              |
| 03     | **Add**           | `git add <file_name>`             | Adds new or changed files in your working directory to git staging area     |
| 04     | **Add All**       | `git add .`                       | Adds all new or changed files in your working directory to git staging area |
| 05     | **Commit**        | `git commit -m "Some message"`    | It is the record of change                                                  |
| 06     | **Push**          | `git push origin <branch_name>`   | Upload local repo content to remote repo                                    |
| 07     | **Init**          | `git init`                        | Used to create a new git repo                                               |
| 08     | **Remote add**    | `git remote add origin <url>`     | Connects your local repo to a remote server                                 |
| 09     | **Remote show**   | `git remote -v`                   | To verify remote                                                            |
| 10     | **Branch**        | `git branch`                      | To check remote branch                                                      |
| 11     | **Rename branch** | `git branch -M <new_branch_name>` | To rename the current branch                                                |
| 12     | **Push to main**  | `git push origin main`            | Pushes the current branch to the main branch on the remote repository       |
