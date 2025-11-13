let url = "https://catfact.ninja/fact";

fetch(url)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
    document.querySelector("#catFact").innerText = data.fact;
  })
  .catch((err) => {
    console.log("Error: ", err);
  });
