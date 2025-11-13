/* We want to change the color of the h1 element into multiple colors after 1 second delay everytime.*/

// Now It'll not make proper sence of the following code but It'll work in database when we'll add multiple data one after another bt adding the data will depend on the previous data addition. Like if one data is added successfully then only the next data will be added. And if any error occurs in between then the further data addition will be stopped.

h1 = document.querySelector("h1");

function changeColor(color, delay, nextColorChange) {
  setTimeout(() => {
    h1.style.color = color;

    if (nextColorChange) {
      // If the color changed successfully then only call the next function (If the nextColorChange is provided as argument then only call it)
      nextColorChange();
    }
  }, delay);
}

changeColor("red", 1000, () => {
  changeColor("orange", 1000, () => {
    changeColor("yellow", 1000, () => {
      changeColor("green", 1000, () => {
        changeColor("blue", 1000, () => {
          changeColor("indigo", 1000, () => {
            changeColor("violet", 1000, () => {
              // All colors changed successfully
            });
          });
        });
      });
    });
  });
});

// This is called Callback Hell. Because of this structure the code is very difficult to read and maintain.
// To solve this problem we use Promises and Async/Await in JavaScript.

// Note: This code is just for understanding the concept of Callback Hell. In real scenarios, we should avoid such code structure.
