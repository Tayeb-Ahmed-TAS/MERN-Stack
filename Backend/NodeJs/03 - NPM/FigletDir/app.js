const figlet = require('figlet');

figlet("Taskin Tabassum Shorna", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});