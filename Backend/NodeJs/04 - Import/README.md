# Importing Modules in Node.js

## To `import` and `export` module in Node.js

### Step -1

Ensure that your project is set up to use ES6 modules. You can do this by adding `"type": "module"` in your `package.json` file in the directory where you want to import/export modules.

#### Demo Module Configuration

```json
{
  "name": "your-project-name",
  "version": "1.0.0",
  "type": "module", // This line enables ES6 module support
  ...
}
```

### Step -2

Use the `export` statement to export functions, objects, or primitive values from a module. For example, create a file named `math.js`:

    ```javascript
    // math.js
    export function add(a, b) {
      return a + b;
    }

    export const PI = 3.14;

    const subtract = (a, b) => a - b;
    ```

### Step -2.1 (Optional)

You can also use `export default` to export a single value from a module. For example, modify the `math.js` file:

    ```javascript
    // math.js
    export default function add(a, b) {
      return a + b;
    }

    const PI = 3.14;

    export { PI };
    ```

### Step -3

Use the `import` statement to import the exported members into another file. For example, create a file named `app.js`:

    ```javascript
    // app.js
    import { add, PI } from './math.js';

    console.log("Addition:", add(2, 3));
    console.log("Value of PI:", PI);
    ```

### Step -3.1 (Optional)

If you used `export default`, you can import it without curly braces. For example, modify the `app.js` file:

    ```javascript
    // app.js
    import add, { PI } from './math.js';

    console.log("Addition:", add(2, 3));
    console.log("Value of PI:", PI);
    ```

### Step -4

Run your application using Node.js:

    ```bash
    node app.js
    ```
