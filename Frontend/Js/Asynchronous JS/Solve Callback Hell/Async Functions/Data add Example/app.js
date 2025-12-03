function saveToDB(data) {
  return new Promise((resolve, reject) => {
    let internetSpeed = Math.floor(Math.random() * 10) + 1; // Random speed between 1 and 10

    if (internetSpeed > 4) {
      resolve(`Success: Your data '${data}' was Saved! `);
    } else {
      reject(`Failure: Weak Connection! Your data '${data}' was not Saved! `);
    }
  });
}

async function saveDataSequentially() {
  try {
    await saveToDB("C++").then((message) => console.log(message));
    await saveToDB("Java").then((message) => console.log(message));
    await saveToDB("JavaScript").then((message) => console.log(message));
  } catch (error) {
    console.error(error);
  }

  console.log("All data processed");
}

saveDataSequentially();

// Or,

// async function saveDataSequentially() {
//   try {
//     const data1 = await saveToDB("C++");
//     console.log(data1);
//     const data2 = await saveToDB("Java");
//     console.log(data2);
//     const data3 = await saveToDB("JavaScript");
//     console.log(data3);
//   } catch (error) {
//     console.error(error);
//   }

//   console.log("All data processed");
// }

// saveDataSequentially();
