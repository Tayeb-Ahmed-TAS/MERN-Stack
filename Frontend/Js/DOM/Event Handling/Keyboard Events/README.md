# Keyboard Events

Keyboard events are actions that occur when a user interacts with the keyboard. These events can be captured and handled using JavaScript to create interactive web applications. The most common keyboard events are:

- `keydown`: Triggered when a key is pressed down.
- `keyup`: Triggered when a key is released.
- `keypress`: Triggered when a key is pressed down and produces a character value (deprecated, use `keydown` instead).
- `input`: Triggered when the value of an input element changes.
- `change`: Triggered when the value of an input element changes and the element loses focus.
  These events can be used to perform actions such as form validation, keyboard shortcuts, and more.

```html
<input type="text" id="myInput" placeholder="Type something..." />
```

```javascript
const input = document.querySelector("#myInput");
input.addEventListener("keydown", (event) => {
  console.log(`Key down: ${event.key}`);
});

input.addEventListener("keyup", (event) => {
  console.log(`Key up: ${event.key}`);
});

input.addEventListener("input", (event) => {
  console.log(`Input changed: ${event.target.value}`);
});

input.addEventListener("change", (event) => {
  console.log(`Input value changed to: ${event.target.value}`);
});
```

## More Events

[Keyboard Events - MDN](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)

### To check Keyboard event

```html
<input type="text" id="myInput" placeholder="Type something..." />
```

```javascript
const input = document.querySelector("#myInput");

input.addEventListener("keydown", (event) => {
  console.log(event);
});
```
