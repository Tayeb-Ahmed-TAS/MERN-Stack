# Express Router

Express Router is a way to organize your Express application by separating routes into different files. This helps keep your code clean and manageable, especially as your application grows.

[Express Router Documentation](https://expressjs.com/en/guide/routing.html#express-router) | [Express Router API](https://expressjs.com/en/4x/api.html#router)

---

## 📌 What You Will Learn

- What Express Router is
- Why Express Router is used
- How `server.js` works
- How router files work
- How routes are connected using `app.use()`
- How URLs are formed
- How requests flow in an Express app

---

## 📁 Folder Structure

```bash
08 - Express Router/
│
├── server.js
|
├── routes/
│   ├── user.js
│   └── post.js
│
└── README.md
```

---

## 🚀 Technologies Used

- Node.js
- Express.js

---

## 🧠 What Is Express Router? (Easy Explanation)

**Express Router is used to split routes into different files.**

Instead of writing all routes in one file, we:

- group related routes together

- keep the main server file clean

Example:

- `server.js` → main file

- `user.js` → user-related routes

- `post.js` → post-related routes

---

## 🖼️ Explanation of `server.js`

### Purpose

- Main entry point of the application

- Creates the Express app

- Connects router files

- Starts the server

### Code Example

```js
const express = require("express");
const app = express();

const users = require("./routes/user");
const posts = require("./routes/post");

app.get("/", (req, res) => {
  res.send("Hi, I am root!");
});

app.use("/users", users);
app.use("/posts", posts);

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
```

### Explanation

- `app.use("/users", users)` → routes starting with `/users` go to `user.js`

- `app.use("/posts", posts)` → routes starting with `/posts` go to `post.js`

---

## 🖼️ Explanation of `routes/user.js`

### Purpose

- Handles all user-related routes

```js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("GET for users");
});

router.get("/:id", (req, res) => {
  res.send("GET for user id");
});

router.post("/", (req, res) => {
  res.send("POST for users");
});

router.delete("/:id", (req, res) => {
  res.send("DELETE for user id");
});

module.exports = router;
```

### Final URLs

| Method | URL        |
| ------ | ---------- |
| GET    | /users     |
| GET    | /users/:id |
| POST   | /users     |
| DELETE | /users/:id |

---

## 🖼️ Explanation of `routes/post.js`

```js
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.send("POST for posts");
});

router.delete("/:id", (req, res) => {
  res.send("DELETE for post id");
});

module.exports = router;
```

### Final URLs

| Method | URL        |
| ------ | ---------- |
| POST   | /posts     |
| DELETE | /posts/:id |

---

## 🔄 Request Flow Example

```javascript
DELETE /posts/10
→ server.js
→ post router
→ router.delete('/:id')
→ response sent
```

---

## 🧩 One-Line Definition

**Express Router is a mini Express app used to group related routes and connect them to the main app using `app.use()`.**

---
