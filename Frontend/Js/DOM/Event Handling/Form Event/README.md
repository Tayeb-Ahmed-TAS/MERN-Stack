# Form Events

## Example

```html
<form id="myForm" action="/action">
  <input type="text" name="username" placeholder="Username" required />
  <input type="password" name="password" placeholder="Password" required />
  <button type="submit">Submit</button>
</form>
```

```javascript
const form = document.querySelector("#myForm");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevents the default form submission behavior
  const formData = new FormData(form);
  const username = formData.get("username");
  const password = formData.get("password");
  console.log(`Username: ${username}, Password: ${password}`);
  // You can add further processing here, like sending data to a server
});
```

# Extracting Form Data

## Track Form values

```html
<form id="myForm" action="/action"></form>
  <input type="text" name="username" placeholder="Username" required />
  <input type="password" name="password" placeholder="Password" required />
  <button type="submit">Submit</button>
</form>
```

```javascript
const form = document.querySelector("#myForm");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevents the default form submission behavior

  let userName = document.querySelector("input[name='username']");
  let password = document.querySelector("input[name='password']");

  console.log(`Username: ${userName.value}, Password: ${password.value}`);
});
```

### Do the same using form (Object) elements

```javascript
const form = document.querySelector("#myForm");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevents the default form submission behavior

  let userName = this.elements[0]; // first element (form.elements[0])
  let password = this.elements[1];

  console.log(`Username: ${userName.value}, Password: ${password.value}`);
});
```

## More events

### Change event

The `change` event is fired for `<input>`, `<select>`, and `<textarea>` elements when the user modifies the value and the element loses focus.

```html
<form id="myForm" action="/action"></form>
  <input type="text" name="username" placeholder="Username" required />
  <input type="password" name="password" placeholder="Password" required />
  <button type="submit">Submit</button>
</form>
```

```javascript
const form = document.querySelector("#myForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();
});

const usernameInput = form.querySelector("input[name='username']");

usernameInput.addEventListener("change", function (event) {
  console.log(`Username changed to: ${this.value}`);
});
```

It will log the new username value when the input loses focus after a change.

### Input event

The `input` event is fired for `<input>`, `<select>`, and `<textarea>` elements whenever the value changes, providing real-time feedback.

```html

<form id="myForm" action="/action"></form>
  <input type="text" name="username" placeholder="Username" required />
  <input type="password" name="password" placeholder="Password" required />
  <button type="submit">Submit</button>
</form>
```

```javascript
const form = document.querySelector("#myForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();
});

const usernameInput = form.querySelector("input[name='username']");

usernameInput.addEventListener("input", function (event) {
  console.log(`Current username: ${this.value}`);
});
```

It will log the current username value as the user types.
