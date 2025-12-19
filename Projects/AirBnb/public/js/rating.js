const stars = document.querySelectorAll(".star");
const ratingInput = document.querySelector("#rating");

for (let star of stars) {
  star.addEventListener("click", () => {
    ratingInput.value = star.dataset.value; // Set the hidden input value to the selected rating

    for (let s of stars) {
      s.classList.toggle("active", s.dataset.value <= ratingInput.value); // Highlight stars up to the selected rating
      // s.dataset.value <= ratingInput.value condition returns true or false. If the star value is less than or equal to the selected rating, it adds the 'active' class; otherwise, it removes it.
    }
  });
}
