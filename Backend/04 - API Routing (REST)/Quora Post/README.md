# Quora Post API Routing (REST)

## Basic Layout

Before creating a RESTful API for a Quora-like platform, just have a look at the following layout:

| HTTP Method  | Endpoint     | Description                    | Route                  |
| ------------ | ------------ | ------------------------------ | ---------------------- |
| **`GET`**    | `/posts`     | To get data for all posts      | **Index Route** (main) |
| **`POST`**   | `/posts`     | To add new post                | **Create Route**       |
| **`GET`**    | `/posts/:id` | To get one post (using id)     | **View Route**         |
| **`PATCH`**  | `/posts/:id` | To update (edit) specific post | **Update Route**       |
| **`DELETE`** | `/posts/:id` | To delete specific post        | **Destroy Route**      |

# Implement

## 1. Index Route - Get all posts

```javascript
// index.js
const express = require("express");
const path = require("path");
const app = express();

const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

let posts = [
  {
    username: "apnacollege",
    content: "I love coding!",
  },
  {
    username: "john_doe",
    content: "Express.js makes backend development easy.",
  },
  {
    username: "jane_smith",
    content: "EJS is a simple templating engine for Node.js.",
  },
];

// Index Route - Get all posts

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

## 2. Create Route - Add new post

For that, we need to create 2 routes:

|     | Description                         | HTTP Method | Endpoint     |
| --- | ----------------------------------- | ----------- | ------------ |
| 01  | Serve the form to create a new post | **`GET`**   | `/posts/new` |
| 02  | Add new post                        | **`POST`**  | `/posts`     |

```javascript
// index.js

---
    ---

// Create Route - Add new post
// Serve the form to create a new post
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

// Add new post
app.post("/posts", (req, res) => {
    const {username, content} = req.body;

    // Add data to posts array
    posts.push({username, content});

    // Redirect to index route
    res.redirect("/posts");
});

    ---
---
```

## 3. View Route - Get one post (using id)

- At first we need to add an `id` field to each post in the `posts` array. Then we can create the view route.

```javascript
// index.js

let posts = [
  {
    username: "apnacollege",
    content: "I love coding!",
  },
  {
    username: "john_doe",
    content: "Express.js makes backend development easy.",
  },
  {
    username: "jane_smith",
    content: "EJS is a simple templating engine for Node.js.",
  },
];
```

- Now, we can create the view route.

```javascript
// index.js

---
    ---

// View Route - Get one post (using id)

    ---
---
```

## 4. Using Unique IDs

We'll use **UUID** Package to generate unique IDs for each post.

### Install UUID (Universally Unique Identifier) Package

```bash
npm install uuid
```

### require UUID in the code

```javascript
// index.js
const { v4: uuidv4 } = require("uuid");
```

### Update posts array to use UUIDs

```javascript
// index.js

let posts = [
  {
    id: uuidv4(),
    username: "apnacollege",
    content: "I love coding!",
  },
  {
    id: uuidv4(),
    username: "john_doe",
    content: "Express.js makes backend development easy.",
  },
  {
    id: uuidv4(),
    username: "jane_smith",
    content: "EJS is a simple templating engine for Node.js.",
  },
];
```

### Update `2. Create Route - Add new post`

```javascript
// index.js

// Add new post
app.post("/posts", (req, res) => {
  const { username, content } = req.body;

  // generate a unique id for the new post
  let id = uuidv4();

  // add the new post to the posts array
  posts.push({ id, username, content });

  // redirect to the index route
  res.redirect("/posts");
});
```

## 5. Update Route - Update (Edit) specific post

**NOTE:** In HTML forms, we can only use `GET` and `POST` methods. To use other HTTP methods like `PATCH` or `DELETE`, we can use a package called **method-override**.

### 5.1 Install method-override package

```bash
npm install method-override
```

### 5.2 Override method in form action

We'll use `?_method=PATCH` in the form action field to override the method.

```html
<!-- edit.ejs -->
<form action="/posts/<%= post.id %>?_method=PATCH" method="POST">
  <!--Code for editing post-->
</form>
```

Here `?_method=PATCH` tells method-override to treat this request as a `PATCH` request.

If we want to use `DELETE` method, we can use `?_method=DELETE` in the form action field.

### 5.3 Require method-override in the code

```javascript
// index.js
const methodOverride = require("method-override");
```

### 5.4 Use method-override middleware

```javascript
app.use(methodOverride("_method"));
```

### 5.5 Implement Update Route

```javascript

// index.js
---
  ---

// Update Route -> Update (Edit) specific post

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;

  // find the post with the given id
  let post = posts.find((p) => p.id === id);

  // Update the content
  post.content = newContent;

  // Redirect to index route
  res.redirect("/posts");
});

// Serve the edit form

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;

  // find the post with the given id
  let post = posts.find((p) => p.id === id);

  res.render("edit.ejs", { post });
});

    ---
---

```

## 6. Destroy Route - Delete specific post

```javascript
// index.js
---
  ---

// Destroy Route -> Delete specific post

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;

  // filter out the post with the given id and update the posts array
  posts = posts.filter((p) => p.id !== id);

  // Redirect to index route
  res.redirect("/posts");
});

    ---
---
```
