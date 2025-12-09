# Chat App with MongoDB and Express

## Route Structure

| **HTTP Method** | **Endpoint**      | **Description**         | **Route**         |
| --------------- | ----------------- | ----------------------- | ----------------- |
| **GET**         | `/chats`          | Show all chats          | **Index Route**   |
| **GET**         | `/chats/new`      | Form to create new chat | **New Route**     |
| **POST**        | `/chats`          | Create a new chat       | **Create Route**  |
| **GET**         | `/chats/:id/edit` | Form to edit chat       | **Edit Route**    |
| **PUT**         | `/chats/:id`      | Update a chat           | **Update Route**  |
| **DELETE**      | `/chats/:id`      | Delete a chat           | **Destroy Route** |

## Using Date

**Date** looks like `Tue Dec 09 2025 20:25:20 GMT+0600 (Bangladesh Standard Time)`

### Step - 1

At first, we've convert it into string using `toString()` method.

```javascript
// .ejs file
<%= chat.created_at.toString() %>
```

### Step - 2

Then, we can use JavaScript's `split()` method to break the string into an array and extract the desired parts.

```javascript
// .ejs file
<% let dateParts = chat.created_at.toString().split(" "); %>
```

Then It will give us an array like this:

```javascript
[
  "Tue",
  "Dec",
  "09",
  "2025",
  "20:25:20",
  "GMT+0600",
  "(Bangladesh",
  "Standard",
  "Time)",
];
```

Because we split by space, so each part is separated by space.

And looks like this in the webpage:

```javascript
Tue,Dec,09,2025,20:25:20,GMT+0600,(Bangladesh,Standard,Time)
```

### Step - 3

We need time which is in index 4 of the array. So, we can access it like this:

```javascript
// .ejs file
<%= chat.created_at.toString().split(" ")[4] %>
```

This will give us only the time part: `20:25:20`

### Step - 4

If we want date, we can concatenate the parts we need:

```javascript
// .ejs file
<%= chat.created_at.toString().split(" ").slice(0, 4).join(" ") %>
```

This will give us the date part: `Tue Dec 09 2025`

Here, we used `slice(0, 4)` to get the first four parts (day, month, date, year) and then joined them back into a string with spaces using `join(" ")`.

If we want to join with comma, we can use `join(", ")` instead.

## Point to be noted

- If we're using `.then()` method then we don't need to use `async` and `await` keyword in the route handler function.

- If we're using `async` and `await` keywords then we don't need to use `.then()` method.

- When we're using `await` keyword then the function must be declared as `async` function.
