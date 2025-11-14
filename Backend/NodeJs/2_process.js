let args = process.argv;

for (let i = 2; i < args.length; i++) {
  // Skipping first two elements because they are 'node' and the script name

  console.log("Hello ", args[i]);
}
