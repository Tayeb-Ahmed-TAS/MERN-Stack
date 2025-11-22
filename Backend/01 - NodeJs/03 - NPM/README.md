# NPM (Node Package Manager)

**NPM** is the standard package manager for Node.js.

## Installing Packages

To install a package using NPM, you can use the following command:

```bash
npm install <package-name>
```

This will install the package and add it to your `node_modules` directory.

## NPM website

[NPM Website](https://www.npmjs.com/)

You can search for packages, read documentation, and find more information about NPM on their official website.

### node_modules

The `node_modules` folder contains every installed dependency for your project.

### package-lock.json

It records the exact version of every installed dependency, including its sub-dependencies and their versions.

### package.json

The `package.json` file contains descriptive and functional `metadata` about a project, such as a name, version, and dependencies.

To create a `package.json` file, you can use the following command:

```bash
npm init
```

This will prompt you to enter information about your project and generate a `package.json` file.

### Install dependencies from package.json

To install all dependencies listed in the `package.json` file, you can use the following command:

```bash
npm install
```

This will read the `package.json` file and install all the required packages into the `node_modules` directory.

## Create our own package.json

```bash
mkdir MyNpmProject

cd MyNpmProject

npm init
```

## Global Installation

It is less common to install packages globally, but it can be useful for command-line tools.

**Note:** Installing packages locally is a good practice.

### Step - 1: Change Ownership

By default, NPM installs packages locally to the project directory. However, you can also install packages globally so that they are available system-wide. To do this, you may need to change the ownership of the global `node_modules` directory to your user:

```bash
sudo chown -R $USER /usr/local/lib/node_modules
```

### Step - 2: Install Package Globally

To install a package globally, you can use the `-g` flag:

```bash
npm install -g <package-name>
```

This will make the package available system-wide.

### Step - 3: Link Global Package

To link a globally installed package to your project, you can use the following command:

```bash
npm link <package-name>
```

---

## Uninstalling Packages

To uninstall a package, you can use the following command:

```bash
npm uninstall <package-name>
```

This will remove the package from your `node_modules` directory and update the `package.json` file accordingly.

## Updating Packages

To update a package to the latest version, you can use the following command:

```bash
npm update <package-name>
```

This will update the package to the latest version and modify the `package.json` file if necessary.
