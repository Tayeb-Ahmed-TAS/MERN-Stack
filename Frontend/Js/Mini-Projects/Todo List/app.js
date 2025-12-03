let btn = document.querySelector("button");

let ul = document.querySelector("ul");
let input = document.querySelector("input");

btn.addEventListener("click", () => {
  let list_item = document.createElement("li"); // Create a new list item

  list_item.innerText = input.value; // Set its text to the input value

  let delete_btn = document.createElement("button"); // Create a delete button

  delete_btn.innerText = "Delete"; // Set button text

  delete_btn.classList.add("delete-btn"); // Add a class for styling

  list_item.appendChild(delete_btn); // Add the delete button to the list item

  ul.appendChild(list_item); // Add the list item to the unordered list

  input.value = ""; // Clear input field after adding the task
});

// Delete a task when the delete button is clicked (Event Delegation)

// For event delegation, we need to attach the event listener to a parent element (ul in this case) that exists when the page loads not the dynamically created elements (Buttons in this case)

// Because the buttons are created dynamically, we cannot attach event listeners to them directly when the page loads

// So we attach the event listener to the ul element and check if the clicked target is a delete button

ul.addEventListener("click", (e) => {
  if (e.target.nodeName == "BUTTON") {
    let parent_el = e.target.parentElement; // Get the parent list item of the clicked delete button
    parent_el.remove(); // Remove the parent list item from the DOM
  }
});

// Optional: Add task on pressing "Enter" key (Link the Enter key to the button click event)

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    btn.click(); // Trigger the button click event
  }
});
