# API Routing (REST)

## 1. What is REST?

**REST (Representational State Transfer)** is an architectural style that defines a set of constraints to be used for creating web services.

**RESTful** APIs use **HTTP** requests to perform **CRUD (Create, Read, Update, Delete)** operations on resources.

[Best Practices for REST API Design](https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design)

## 2. CRUD Operations and HTTP Methods

### 2.1 HTTP Methods

- **GET**: Retrieve resources.

- **POST**: Submits new data to the server.

- **PUT**: Updates existing data. Like replacing an entire resource with new data such as updating all fields of a user profile.

- **PATCH**: Update existing data partially. Like updating a single field of a resource such as changing only the email address of a user.

- **DELETE**: Removes data.

### 2.2 CRUD Operations Mapping

| CRUD Operation | HTTP Method | Description                 |
| -------------- | ----------- | --------------------------- |
| Create         | POST        | Create a new resource       |
| Read           | GET         | Retrieve a resource         |
| Update         | PUT/PATCH   | Update an existing resource |
| Delete         | DELETE      | Remove a resource           |

## 3. Redirect

`res.redirect(URL)` is used to redirect the user to a different URL.

### Example

```javascript
app.post("/submit", (req, res) => {
  // Process the form data here

  // Redirect to the thank you page
  res.redirect("/thank_you");
});
```

[Learn more](https://devdocs.io/express/index#res.redirect)
