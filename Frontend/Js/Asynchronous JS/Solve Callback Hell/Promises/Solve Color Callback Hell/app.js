h1 = document.querySelector("h1");

function changeColor(color, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      h1.style.color = color;
      resolve(`${color} color was applied`);
    }, delay);
  });
}

changeColor("red", 1000)
  .then((message) => {
    console.log(message);
    return changeColor("orange", 1000);
  })
  .then((message) => {
    console.log(message);
    return changeColor("yellow", 1000);
  })
  .then((message) => {
    console.log(message);
    return changeColor("green", 1000);
  })
  .then((message) => {
    console.log(message);
    return changeColor("blue", 1000);
  })
  .then((message) => {
    console.log(message);
  });
