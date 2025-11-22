# Node.js

- JavaScript Runtime Environment.

- It is used for **server side** programming.

**Note:** _Node.js_ is not a language, library, or framework.

## Node REPL

- REPL stands for Read-Eval-Print Loop.

- `node` - starts the Node.js REPL.

- `.help` - gives us commands.

- `.exit` - exits the REPL.

## Node Files

**To run a JavaScript file using Node.js:**

- Create a file with `.js` extension.

- Go to terminal and navigate to the file location.

- Use `node filename.js` to run the file in terminal.

## Process in Node.js

- `process` : This **object** provides information about, and control over, the current Node.js process.

- `process.argv` : Returns an **array** containing the command-line arguments passed when the Node.js process was launched.

**Example:**

```javascript
// filename: process.js

let args = process.argv;

for (let i = 2; i < args.length; i++) {
  // Skipping first two elements because they are 'node' and the script name

  console.log("Hello ", args[i]);
}
```

**To run the above file:**

```bash
# At first navigate to the file location in terminal

node process.js Alice Bob Charlie
```

**Output:**

```output
Hello  Alice
Hello  Bob
Hello  Charlie
```
