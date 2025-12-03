const startTime = Date.now();

for (let i = 0; i < 5; i++) {
  console.log(`${i + 1}. Hello, World!`);
}

// Simulate some processing time
for (let i = 0; i < 1e6; i++) {
  // 1e6 iterations to simulate workload
  Math.sqrt(i);
}

const endTime = Date.now();

console.log(`Total Time: ${endTime - startTime} ms`);
