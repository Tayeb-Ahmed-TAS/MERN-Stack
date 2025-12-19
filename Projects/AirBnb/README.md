# AirBnb Project

## Phase 1

## Part A (Basic setup and CRUD operations)

## Route Structure

| **HTTP Method** | **Endpoint**        | **Description**            | **Route**        |
| --------------- | ------------------- | -------------------------- | ---------------- |
| **GET**         | `/listings`         | Show all listings          | **Index Route**  |
| **GET**         | `/listings/:id`     | Show listing details       | **Show Route**   |
| **GET**         | `/listings/new`     | Form to create new listing | **New Route**    |
| **POST**        | `/listings`         | Create a new listing       | **Create Route** |
| **GET**         | `listings/:id/edit` | Form to edit listing       | **Edit Route**   |
| **PUT**         | `/listings/:id`     | Update a listing           | **Update Route** |
| **DELETE**      | `/listings/:id`     | Delete a listing           | **Delete Route** |

## Part B (Styling)

For that we'll use another package called `EJS-Mate` which allows us to use layouts and partials in EJS templates.

### Installation

```bash
npm install ejs-mate
```

### Usage

In `app.js`, set up EJS-Mate as the rendering engine:

```javascript
const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);
```

Then, create a `views/partials` directory to store partial templates like header and footer. Create `header.ejs` and `footer.ejs` files in that directory.

## Part C (Error Handling, Client and Server-Side Validation)

[ERRORS_AND_VALIDATION.md](./Documentations/ERRORS_AND_VALIDATION.md)

---
