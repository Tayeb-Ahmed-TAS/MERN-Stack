# Async Functions

An async function is a function that is declared with the `async` keyword. It allows you to write asynchronous code that looks and behaves like synchronous code, making it easier to read and maintain.

When an async function is called, it returns a Promise. Inside the async function, you can use the `await` keyword to pause the execution of the function until a Promise is resolved or rejected. This allows you to write code that waits for asynchronous operations to complete before proceeding.

    _Async function returns a Promise by default_

Here's an example of an async function:

```javascript
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchData("https://api.example.com/data").then((data) => {
  console.log("Fetched data:", data);
});
```

In this example, the `fetchData` function is declared as an async function. It uses the `await` keyword to wait for the `fetch` operation to complete and then waits for the response to be converted to JSON. If any error occurs during the fetch operation, it is caught in the `catch` block.

Then we call the `fetchData` function and use `.then()` to handle the resolved data.

---

## Make Arrow Functions Async

You can also create async functions using arrow function syntax by adding the `async` keyword before the parameter list.

Here's an example:

```javascript
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

fetchData("https://api.example.com/data").then((data) => {
  console.log("Fetched data:", data);
});
```

In this example, the `fetchData` function is defined as an async arrow function. It behaves the same way as the previous example, using `await` to handle asynchronous operations.

---

## `await` keyword

The `await` keyword pauses the execution of its surronding async function until the promise is settled (resolved or rejected). It can only be used inside async functions.

Here's an example:

```javascript
async function show() {
  await colorChange("#FF0000", 1000);
  await colorChange("#00FF00", 1000);
  await colorChange("#0000FF", 1000);
  await colorChange("#FFFF00", 1000);
  await colorChange("#FF00FF", 1000);

  return "All colors changed";
}

show();
```

In this example, the `show` async function uses the `await` keyword to wait for each `colorChange` operation to complete before proceeding to the next one. After all color changes are done, it returns a message.

When you call the `show` function, it returns a Promise that resolves with the message "All colors changed".

---

## `await` with rejected Promises

If the Promise being awaited is rejected, the `await` expression will throw the rejected value. You can handle this using a `try...catch` block inside the async function.

Here's an example:

```javascript
function changeColor(color, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let number = Math.floor(Math.random() * 10) + 1;
      if (number > 5) {
        reject("Error: Color change failed");
      } else {
        document.body.style.backgroundColor = color;
        resolve();
      }
    }, delay);
  });
}

async function showColors() {
  try {
    await changeColor("#FF0000", 1000);
    await changeColor("#00FF00", 1000);
    await changeColor("#0000FF", 1000);
    await changeColor("#FFFF00", 1000);
    await changeColor("#FF00FF", 1000);
    return "All colors changed successfully";
  } catch (error) {
    console.error(error);
  }

  let a = 10;
  console.log(a);
}
```

## `throw` inside Async Functions

You can use the `throw` statement inside an async function to reject the returned Promise. When you throw an error, it will be caught by any `catch` block that handles the Promise.

`throw` is used to throw an error.

Here's an example:

```javascript
async function getNumber() {
  const randomNum = Math.floor(Math.random() * 10) + 1;

  if (randomNum >= 5) {
    return randomNum;
  } else {
    throw new Error("Number is less than 5");
  }
}

getNumber();
```

In this example, the `getNumber` async function generates a random number between 1 and 10. If the number is 5 or greater, it returns the number. If the number is less than 5, it throws an error.

When you call the `getNumber` function, it will return a Promise. If the number is less than 5, the Promise will be rejected with the error thrown.

You can handle the rejection using `.catch()`:

```javascript
async function getNumber() {
  const randomNum = Math.floor(Math.random() * 10) + 1;

  if (randomNum >= 5) {
    return randomNum;
  } else {
    throw new Error("Number is less than 5");
  }
}

getNumber()
  .then((num) => {
    console.log("Generated number:", num);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });
```

In this example, if the generated number is less than 5, the error will be caught in the `.catch()` block, and the error message will be logged to the console.

In this example, if the generated number is less than 5, the error will be caught in the `.catch()` block, and the error message will be logged to the console.

---
