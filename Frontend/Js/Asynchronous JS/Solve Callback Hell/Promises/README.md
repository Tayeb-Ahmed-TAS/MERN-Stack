# Promises

The _Promise_ object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

**JS gives us Promises to avoid Callback Hell.**

**Promise is an object.**

_resolve_: function to be called when the asynchronous operation is successful.

_reject_: function to be called when the asynchronous operation fails.

## Promise States

A Promise can be in one of three states:

1. **Pending**: Initial state, neither fulfilled nor rejected.

2. **Fulfilled**: The asynchronous operation completed successfully.

3. **Rejected**: The asynchronous operation failed.

## Promise Methods

Promises have several methods to handle their results:

- `then()`: Called when the Promise is fulfilled. It takes two optional arguments: a callback for success and a callback for failure.

- `catch()`: Called when the Promise is rejected. It takes one argument: a callback for failure.

- `finally()`: Called when the Promise is settled, regardless of its outcome. It takes one argument: a callback to be executed when the Promise is settled.

## Creating a Promise

A Promise is created using the `Promise` constructor which takes a function (executor) with two parameters: `resolve` and `reject`.

```javascript
const myPromise = new Promise((resolve, reject) => {
  // Asynchronous operation
  let success = true; // Simulating success or failure

  if (success) {
    resolve("Data saved successfully!");
  } else {
    reject("Error saving data.");
  }
});
```

## Callbach Hell Example

```javascript
function saveToDB(data, success, failure) {
  let internetSpeed = Math.floor(Math.random() * 10) + 1; // Random speed between 1 and 10

  if (internetSpeed > 4) {
    success();
  } else {
    failure();
  }
}

// The below code creates Callback Hell

saveToDB(
  "C++",
  () => {
    console.log("Success: Your data was Saved! ");

    saveToDB(
      "Java",
      () => {
        console.log("Success2: Your data was Saved! ");

        saveToDB(
          "JavaScript",
          () => {
            console.log("Success3: Your data was Saved! ");
          },
          () => {
            console.log("Failure3: Weak Connection! Your data was not Saved! ");
          }
        );
      },
      () => {
        console.log("Failure2: Weak Connection! Your data was not Saved! ");
      }
    );
  },
  () => {
    console.log("Failure: Weak Connection! Your data was not Saved! ");
  }
);
```

## Solve the upper Callback Hell using Promises

```javascript
function saveToBD(data) {
  return new Promise((resolve, reject) => {
    let internetSpeed = Math.floor(Math.random() * 10) + 1; // Random speed between 1 and 10

    if (internetSpeed > 4) {
      resolve(`Success: Your ${data} data was Saved! `);
    } else {
      reject(`Failure: Weak Connection! Your data was not Saved! `);
    }
  });
}

saveToDB("C++")
  .then(() => {
    console.log(`Success: Your data was Saved! `);
  })
  .catch(() => {
    console.log("Failure: Weak Connection! Your data was not Saved! ");
  });
```

## Promise Chaining

Promise chaining allows you to perform a sequence of asynchronous operations in a more readable way.

```javascript
function saveToBD(data) {
  return new Promise((resolve, reject) => {
    let internetSpeed = Math.floor(Math.random() * 10) + 1; // Random speed between 1 and 10

    if (internetSpeed > 4) {
      resolve(`Success: Your ${data} data was Saved! `);
    } else {
      reject(`Failure: Weak Connection! Your data was not Saved! `);
    }
  });
}

saveToDB("C++")
  .then((message) => {
    console.log(message);
    return saveToDB("Java");
  })
  .then((message) => {
    console.log(message);
    return saveToDB("JavaScript");
  })
  .then((message) => {
    console.log(message);
    return saveToDB("Python");
  })
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.log(error);
  });
```

This approach avoids deeply nested callbacks and makes the code easier to read and maintain.
