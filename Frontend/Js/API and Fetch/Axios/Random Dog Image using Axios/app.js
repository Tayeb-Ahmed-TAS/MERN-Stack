let url = "https://dog.ceo/api/breeds/image/random";

let img = document.querySelector("#dogImage");
let btn = document.querySelector("#fetchDogBtn");

btn.addEventListener("click", async () => {
  let link = await getImage();
  img.setAttribute("src", link);
});

async function getImage() {
  try {
    let res = await axios.get(url);
    return res.data.message;
  } catch (err) {
    console.log("Error => ", err);
    return "/";
  }
}
