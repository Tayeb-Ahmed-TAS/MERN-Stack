# Terminal

A **Terminal** is a text-based input and output environment. It allows users to interact with the operating system by typing commands and receiving text-based feedback. Terminals are commonly used for system administration, programming, and running scripts.

## Differenr Terms

- **Comand Line** : Any interface that is used by entering textual commands (e.g., Windows centric)

- **Terminal** : This is a type of command line (e.g., Mac centric)

- **Console** : A command-line interface used to work with yout computer

- **Shell** : A program running on Mac OS / Linux

- **Bash** : A popular shell on Mac OS / Linux

- **Z-Shell** : Another shell (default on Mac OS)

# Commands

## 1.1 Basic Commands

| **Command**                     | **Description**           |
| ------------------------------- | ------------------------- |
| `ls` (List Files)               | Show my files             |
| `pwd` (Print Working Directory) | Where am I?               |
| `clear` (Clear Screen)          | Clear the terminal screen |

## 1.2 Navigation Commands

_Inside & Outside Directories._

| **Command**        | **Description**                | **Example**               |
| ------------------ | ------------------------------ | ------------------------- |
| `cd <directory>`   | Change to a specific directory | `cd Documents`            |
| `cd ..`            | Back button                    | `cd ..`                   |
| `cd ../..`         | Back button (two steps)        | `cd ../..`                |
| `cd /<drive name>` | Change to a specific drive     | `cd /d` (Go to `d` drive) |

### 1.2.2 Paths in Navigation

The following tables explain different types of paths used in navigation commands.

| **Type**      | **Description**                     | **Example**                    |
| ------------- | ----------------------------------- | ------------------------------ |
| Relative Path | Path relative to the current folder | `cd Desktop/Delta`             |
| Absolute Path | Full path from the root directory   | `cd /Users/Name/Desktop/Delta` |
| Home Path     | Shortcut to the home directory      | `cd ~`                         |
| Current Path  | Represents the current directory    | `cd .`                         |
| Root Path     | Represents the root directory       | `cd /`                         |

- `/` : Root directory

- `~` : Home directory

- `.` : Current directory

## 1.3 File and Directory Management Commands

| **Sl** | **Command**                 | **Description**                     | **Example**                         |
| ------ | --------------------------- | ----------------------------------- | ----------------------------------- |
| 01     | `mkdir <directory>`         | Create a new directory              | `mkdir NewFolder`                   |
| 02     | `rm -r <directory>`         | Remove a directory and its contents | `rm -r OldFolder`                   |
| 03     | `touch <file>`              | Create a new file                   | `touch file.txt`                    |
| 04     | `rm <file>`                 | Remove a file                       | `rm file.txt`                       |
| 05     | `cp <source> <destination>` | Copy a file or directory            | `cp file.txt /path/to/destination/` |
| 06     | `mv <source> <destination>` | Move or rename a file or directory  | `mv oldname.txt newname.txt`        |
| 07     | `cat <file>`                | Display the contents of a file      | `cat file.txt`                      |
| 08     | `rm -rf <directory>`        | Force remove a directory            | `rm -rf UnwantedFolder`             |
| 09     | `rmdir <directory>`         | Remove an empty directory           | `rmdir EmptyFolder`                 |

**Note:** To create files and directories with spaces in their names, use quotes. For example: `mkdir "New Folder"` or `touch "my file.txt"`.

**Warning:** If we delete files or directories using the `rm` command, they are permanently deleted and cannot be recovered from the recycle bin.

## Manual Command

To learn more about a specific command and its options, you can use the `man` (manual) command followed by the command name. For example, to view the manual for the `ls` command, you would type:

`man ls`

To exit the manual, press `q`.

**Note:** For Windows Command Prompt and git bash, you can use the `help` command:

`ls --help`

## Flags

**Flags** are characters that we pass with commands to modify their behavior. They usually start with a hyphen (`-`) followed by one or more letters.

| **Flag** | **Description**                                    | **Example** |
| -------- | -------------------------------------------------- | ----------- |
| `-a`     | All: Show all files, including hidden files        | `ls -a`     |
| `-la`    | Long format and show all files                     | `ls -la`    |
| `-l`     | Long format: Show detailed information about files | `ls -l`     |
