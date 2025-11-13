# DOM Events

Events are signals that something has occured (user inputs / actions).

## Inline Events

Inline events are added directly to the HTML elements using event attributes.

```html
<button onclick="alert('Button clicked!'); console.log('Button clicked!');">
  Click Me!
</button>
```

In this example, when the button is clicked, an alert box will appear with the message "Button clicked!", and the same message will be logged to the console.

It is not efficient to use inline events for complex applications, as it mixes HTML and JavaScript code.

## Event Listeners

Event listeners are a more flexible way to handle events. They allow you to separate JavaScript code from HTML.

### Click Event

---

```html
<button id="myButton">Click Me!</button>
```

```javascript
const button = document.querySelector("#myButton");

button.addEventListener("click", () => {
  alert("Button clicked!");
  console.log("Button clicked!");
});
```

In this example, we use `querySelector` to select the button element with the ID `myButton`. Then, we attach an event listener to it using `addEventListener`. When the button is clicked, the specified function will be executed.

### Click Event for multiple elements

---

```html
<button class="myButton">Button 1</button>
<button class="myButton">Button 2</button>
<button class="myButton">Button 3</button>
```

```javascript
const buttons = document.querySelectorAll(".myButton");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    alert(`${button.textContent} clicked!`);
    console.log(`${button.textContent} clicked!`);
  });
});
```

or,

```javascript
const buttons = document.querySelectorAll(".myButton");

for (btn of buttons) {
  btn.addEventListener("click", () => {
    alert(`${btn.textContent} clicked!`);
    console.log(`${btn.textContent} clicked!`);
  });
}
```

or,

```javascript
const buttons = document.getElementsByClassName("myButton");

function sayClicked() {
  alert(`${this.textContent} clicked!`);
  console.log(`${this.textContent} clicked!`);
}

for (btn of buttons) {
  btn.addEventListener("click", sayClicked);

  // or,

  // btn.onclick = sayClicked;
}
```

### Mouse Enter

---

It is triggered when the mouse pointer enters the element.

```html
<div class="myDiv">Hover over me!</div>
```

```javascript
const div = document.querySelector(".myDiv");

div.addEventListener("mouseenter", () => {
  alert("Mouse entered the div!");
  console.log("Mouse entered the div!");
});
```

### Mouse Leave

---

It is triggered when the mouse pointer leaves the element.

```html
<div class="myDiv">Hover over me!</div>
```

```javascript
const div = document.querySelector(".myDiv");

div.addEventListener("mouseleave", () => {
  alert("Mouse left the div!");
  console.log("Mouse left the div!");
});
```

### Mouse Over

---

It is triggered when the mouse pointer is moved onto an element or one of its child elements.

```html
<div class="myDiv">Hover over me!</div>
```

```javascript
const div = document.querySelector(".myDiv");

div.addEventListener("mouseover", () => {
  console.log("Mouse over the div!");
});
```

### Mouse Out

---
It is triggered when the mouse pointer is moved out of an element or one of its child elements.

```html
<div class="myDiv">Hover over me!</div>
```

```javascript
const div = document.querySelector(".myDiv");

div.addEventListener("mouseout", () => {
  console.log("Mouse out of the div!");
});
```

### Double Click

---
It is triggered when the element is double-clicked.

```html
<button id="myButton">Double Click Me!</button>
```

```javascript
const button = document.querySelector("#myButton");

button.addEventListener("dblclick", () => {
  alert("Button double clicked!");
  console.log("Button double clicked!");
});
```

### Other Events

[MDN Web Docs - Event reference](https://developer.mozilla.org/en-US/docs/Web/Events)
