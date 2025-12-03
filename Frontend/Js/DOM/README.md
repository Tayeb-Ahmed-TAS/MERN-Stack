# DOM Manipulation

DOM stands for Document Object Model, which is a programming interface for web documents. It represents the page so that programs can change the document structure, style, and content. The DOM provides a structured representation of the document as a tree of objects, and it defines methods by which these objects can be accessed and manipulated.

## Basic Operations

Here are some common operations you can perform on the DOM using JavaScript:

### Selecting Elements

You can select elements using various methods:

- `document.getElementById(id)`: Selects an element by its ID.
- `document.getElementsByClassName(className)`: Selects elements by their class name
- `document.getElementsByTagName(tagName)`: Selects elements by their tag name.
- `document.querySelector(selector)`: Selects the first element that matches a CSS selector.
- `document.querySelectorAll(selector)`: Selects all elements that match a CSS selector.

### Example

```javascript
// Select an element by ID
const header = document.getElementById("header");

// Select elements by class name
const items = document.getElementsByClassName("item");

// Select elements by tag name
const paragraphs = document.getElementsByTagName("p");

// Select the first element that matches a CSS selector
const firstItem = document.querySelector(".item");

// Select all elements that match a CSS selector
const allItems = document.querySelectorAll(".item");
```

### Modifying Elements

You can modify elements by changing their properties:

- `element.innerHTML`: Gets or sets the HTML content of an element.
- `element.textContent`: Gets or sets the text content of an element.
- `element.style.property`: Gets or sets the inline style of an element.
- `element.setAttribute(name, value)`: Sets the value of an attribute on the specified element.
- `element.getAttribute(name)`: Gets the value of an attribute on the specified element.
- `element.classList`: Provides methods to add, remove, and toggle CSS classes.

### Example

```javascript
// Modify the inner HTML of an element
header.innerHTML = "<h1>Welcome to My Website</h1>";

// Change the text content of an element
firstItem.textContent = "Updated Item";

// Change the inline style of an element
paragraphs[0].style.color = "blue";

// Set an attribute on an element
header.setAttribute("data-role", "header");

// Get an attribute from an element
const role = header.getAttribute("data-role");

// Add a CSS class to an element
firstItem.classList.add("active");

// Remove a CSS class from an element
firstItem.classList.remove("active");

// Toggle a CSS class on an element
firstItem.classList.toggle("active");
```

### Creating Elements

You can create elements dynamically using JavaScript:

- `document.createElement(tagName)`: Creates a new element with the specified tag name.

  - `appendChild(element)`: Adds a new child element at the end of the specified parent element.
  - `append(element)`: Adds a new child element or text node to the specified parent element.
  - `prepend(element)`: Adds a new child element or text node at the beginning of the specified parent element.
  - `insertAdjacent(where, element)`: Inserts a new element at a specified position relative to the target element. The `where` parameter can be one of the following:
    - `'beforebegin'`: Before the target element itself.
    - `'afterbegin'`: Just inside the target element, before its first child.
    - `'beforeend'`: Just inside the target element, after its last child.
    - `'afterend'`: After the target element itself.

### Example

```javascript
// Create a new element
const newDiv = document.createElement("div");
let oldDiv = document.getElementById("oldDiv");
newDiv.textContent = "Hello, World!";

// Append the new element to the body
document.body.appendChild(newDiv);

// Append the new element to the oldDiv
oldDiv.appendChild(newDiv);

// Prepend the new element to the oldDiv
oldDiv.prepend(newDiv);

// Insert the new element before the oldDiv

oldDiv.insertAdjacent("beforebegin", newDiv);

// Insert the new element after the oldDiv
oldDiv.insertAdjacent("afterend", newDiv);

// Only Append a button to oldDiv
const button = document.createElement("button");
button.textContent = "Click Me";
oldDiv.append(button);
```

### Note: `append` is mostly used than `appendChild` as it can append multiple nodes and strings, while `appendChild` can only append a single node

### Removing Elements

- `removeChild(element)`: Removes a child element from the specified parent element.
- `element.remove()`: Removes the element from the DOM.

### Example

```javascript
// Remove a child element
oldDiv.removeChild(button);

// Remove the element itself
button.remove();
```

# Stop Event Bubbling

Event bubbling is a mechanism in the DOM where an event starts from the most specific element (the target) and then flows upward to its ancestors. This means that if you click on a button inside a div, the click event will first be handled by the button, then by the div, and so on up to the document root.

To stop event bubbling, you can use the `event.stopPropagation()` method within an event handler. This method prevents the event from propagating (bubbling up) to parent elements.

## Example

```html

<div>
  <ul></ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ul>
</div>
```

```javascript
const div = document.querySelector("div");
const ul = document.querySelector("ul");
const liItems = document.querySelectorAll("li");

div.addEventListener("click", () => {
  console.log("Div clicked");
});

ul.addEventListener("click", (event) => {
  event.stopPropagation(); // Stops the event from bubbling up to the div
  console.log("UL clicked");
});

for (li of liItems) {
  li.addEventListener("click", (event) => {
    event.stopPropagation(); // Stops the event from bubbling up to the ul and div
    console.log("LI clicked");
  });
}
```
