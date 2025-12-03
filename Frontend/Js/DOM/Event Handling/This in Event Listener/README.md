# `this` ins Event Listener

When `this` is used in a callback of event handler of something, it refers to that soemething.

### Example

```html
<button>Click Me</button>
```

```javascript
let button = document.querySelector("button");
button.addEventListener("click", function () {
  console.log(this);
});
```

```html
Output:

<button>Click Me</button>
```

### Example 2

```html
<button>Click me !</button>
```

```javascript
let button = document.querySelector("button");

button.addEventListener("click", function () {
  console.dir(this.innerText);
});
```

```html
Output: "Click me !"
```

### Example 3

```html
<button>Click me !</button>
```

```javascript
let button = document.querySelector("button");
button.addEventListener("click", function () {
  this.style.backgroundColor = "red";
});
```

_Output:_ The button's background color changes to red when clicked.

## This is very useful when we have multiple elements of same type and we want to add event listener to all of them

Example 4:

```html
<h1>Use of 'this' in event listener</h1>
<h3>Let's demo it on elements</h3>
<p>This is a sample paragraph.</p>
<button>Click Me!</button>
```

_We want to change the background-color of the element to blue when it is clicked._

```javascript
let elements = document.querySelectorAll("h1, h3, p, button");

elements.forEach((e) => {
  e.addEventListener("click", function () {
    this.style.backgroundColor = "blue";
  });
});
```
