# AirBnb Project

# Phase 1

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

# Phase 2

## Part A (Review and Ratings System)

### Route Structure

| **HTTP Method** | **Endpoint**                      | **Description**                                                     | **Route**         |
| --------------- | --------------------------------- | ------------------------------------------------------------------- | ----------------- |
| **POST**        | `/listings/:id/reviews`           | Create a new review                                                 | **Create Review** |
| **DELETE**      | `/listings/:id/reviews/:reviewId` | Delete a review and also remove it from the listing's reviews array | **Delete Review** |

## To delete a review from a listing array in MongoDB, you can use the `$pull` operator

The `$pull` operator removes from an existing array all instances of a value or values that match a specified condition.

Syntax:

```javascript
$pull: { <field>: <value> }
```

```javascript
app.delete(
  "/listings/:id/reviews/:reviewId",
  wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
  })
);
```

## Part B (Routes separation)

Separates the `listings` and `reviews` routes into their own files for better organization.

## Part C (Flash Messages)

Flash messages are used to display temporary messages to users, such as success or error notifications. They are typically stored in the session and removed after being displayed once.

## Part D (User Authentication)

### Sign Up

| **HTTP Method** | **Endpoint** | **Description**        | **Route**             |
| --------------- | ------------ | ---------------------- | --------------------- |
| **GET**         | `/signup`    | Show registration form | **Show Signup Route** |
| **POST**        | `/signup`    | Handle user signup     | **Create User Route** |

### Login

| **HTTP Method** | **Endpoint** | **Description**   | **Route**            |
| --------------- | ------------ | ----------------- | -------------------- |
| **GET**         | `/login`     | Show login form   | **Show Login Route** |
| **POST**        | `/login`     | Handle user login | **Login User Route** |

**Note:** To authenticate user exists or not we need to use a middleware `passport.authenticate()`. It takes the strategy as the first argument like "local" and an options object as the second argument.

```javascript
app.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  (req, res) => {
    // Further code
  }
);
```
