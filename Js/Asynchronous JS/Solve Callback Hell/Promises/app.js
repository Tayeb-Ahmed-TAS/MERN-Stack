// function saveToDB(data, success, failure) {
//   let internetSpeed = Math.floor(Math.random() * 10) + 1; // Random speed between 1 and 10

//   if (internetSpeed > 4) {
//     success();
//   } else {
//     failure();
//   }
// }

/* todo: Callback Hell

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

*/

// The above code demonstrates callback hell due to nested callbacks.
// Let's refactor it using Promises to avoid callback hell.

function saveToDB(data) {
  return new Promise((resolve, reject) => {
    let internetSpeed = Math.floor(Math.random() * 10) + 1; // Random speed between 1 and 10

    if (internetSpeed > 4) {
      resolve("Success: Your data '" + data + "' was Saved! ");
    } else {
      reject("Failure: Weak Connection! Your data was not Saved! ");
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
  })
  .catch((error) => {
    console.log(error);
  });
