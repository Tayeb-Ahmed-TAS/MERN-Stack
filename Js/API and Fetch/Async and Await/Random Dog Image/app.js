let url = "https://dog.ceo/api/breeds/image/random";

let btn = document.querySelector("#fetchDogBtn");
let img = document.querySelector("#dogImage");
let msg = document.querySelector(".msg");

btn.addEventListener("click", async () => {
  try {
    if (msg.classList.contains("error")) {
      msg.classList.remove("error");
    }
    msg.classList.add("processing");
    msg.innerText = "Processing...";
    let res = await fetch(url);

    // Validate response status

    if (res.status !== 200) {
      throw new Error(`Status Code Error: ${res.status}`);
    }

    let data = await res.json();

    // Validate response body

    if (!data || data.status !== "success" || !data.message) {
      throw new Error("Invalid response data");
    }

    // Handle broken image loads
    img.onerror = () => {
      if (msg.classList.contains("processing")) {
        msg.classList.remove("processing");
      }
      msg.classList.add("error");
      msg.innerText = "Failed to load image.";
    };

    img.setAttribute("src", data.message);
    msg.innerText = "Here is a random dog image for you!";
  } catch (err) {
    if (msg.classList.contains("processing")) {
      msg.classList.remove("processing");
    }
    msg.classList.add("error");
    msg.innerText = err.message;
    console.log("Error:", err);
  }
});
