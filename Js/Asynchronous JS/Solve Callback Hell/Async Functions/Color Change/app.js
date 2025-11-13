h1 = document.querySelector("h1");

function changeColor(color, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      h1.style.color = color;
      console.log(`${color} color was applied`);
      resolve(`Color changed to ${color}`);
    }, delay);
  });
}

async function nowChangeColor() {
  await changeColor("red", 1000);
  await changeColor("orange", 1000);
  await changeColor("yellow", 1000);
  await changeColor("green", 1000);
  await changeColor("blue", 1000);
}

nowChangeColor();
