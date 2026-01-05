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

## Part E

### Connection Login Route

How to check if User is Logged in ?

We can use `req.isAuthenticated()` method provided by **Passport** to check if a user is logged in or not. It returns true if the user is authenticated, otherwise false.

### Logout User

| **HTTP Method** | **Endpoint** | **Description** | **Route**             |
| --------------- | ------------ | --------------- | --------------------- |
| **GET**         | `/logout`    | Logout the user | **Logout User Route** |

`req.logout()` method provided by **Passport** is used to log out a user. It removes the user object from the session, effectively ending the user's authenticated session.

It takes a callback as an argument to handle any potential errors during the logout process.

```javascript
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logged you out successfully!");
    res.redirect("/listings");
  });
});
```

### If User is Logged in show Logout option in Navbar and if not show Login and Signup options

**Passport** adds a `user` property to the `req` object when a user is authenticated. We can use this property to check if a user is logged in or not.

**`req.user`** will be defined if the user is logged in, otherwise it will be undefined.

> **Remember:** `.ejs` cannot access `req` object directly. We need to pass it from `app.js` to all templates using middleware as `res.locals`

```javascript
// app.js

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user; // Pass the logged-in user to all templates

  next();
});
```

```html
<!-- navbar.ejs -->

<% if(!currUser) { %>
<a class="nav-link" aria-current="page" href="/signup">Sign up</a>
<a class="nav-link" href="/login">Log in</a>
<% } %> <% if(currUser) { %>
<a class="nav-link" href="/logout">Log out</a>
<% } %>
```

### Login automatically after Signup

**Passport's** login method automatically establishes a login session.

`req.login(user, callback)` method is used to log in a user programmatically when they sign up.

When the login operation completes, `user` will be assigned to `req.user`, and a session will be established.

```javascript
// routes/user.js

// Create User Route -> Handle user signup
router.post(
  "/signup",
  wrapAsync(async (req, res, next) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);

      // Log the user in after successful registration
      req.login(registeredUser, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", "Welcome to Wanderlust!");
        res.redirect("/listings");
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  })
);
```

### Post Login Page

`req` object has so many properties. Two important properties are `req.path` and `req.originalUrl`.

`originalUrl` is much more useful than `path` because it includes the entire URL, including the query string.

We can use `req.originalUrl` to store the URL the user was trying to access before being redirected to the login page. After a successful login, we can redirect the user back to that URL.

We'll store the `originalUrl` in the `session` before redirecting to the login page if the user is not logged in. But But But, **Passport** resets the session after login, so we need to store it in a middleware before authentication. That's why we create another middleware in `middleware.js` and inside that we've to save the `originalUrl` in `res.locals`.

```javascript
// middleware.js

// Middleware to check if user is logged in or not
module.exports.isLoggedIn = (req, res, next) => {
  // If user is not logged in
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl; // Store the url they are requesting
    req.flash("error", "You must be logged in to perform that action!");
    return res.redirect("/login");
  }

  next();
};

// Middleware to save the redirectUrl

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }

  next();
};
```

And then, in the login route handler, we can redirect the user to the stored URL after a successful login.

```javascript
// routes/user.js

// Login User Route -> Handle user login
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("success", "Welcome back to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
  }
);
```

---

## Starting Authorization

### Hide Edit and Delete buttons if the user is not the author of the listing

```html
<!-- views/listings/show.ejs -->

<% if(currUser && currUser._id.equals(listing.owner._id)) { %>
<!-- Show Edit and Delete buttons only if the current user is available and is the owner of the listing -->
<div class="btns">
  <a
    href="/listings/<%= listing._id %>/edit"
    class="btn btn-dark col-1 offset-3 edit_btn"
    >Edit</a
  >

  <form method="POST" action="/listings/<%= listing._id %>?_method=DELETE">
    <button class="btn btn-dark offset-5">Delete</button>
  </form>
</div>
<% } %>
```

> In the above code, we check if `currUser` exists and if the `currUser._id` is equal to the `listing.owner._id`. If both conditions are true, we display the Edit and Delete buttons. Otherwise, they will be hidden.
>
> Here, we are using the `equals` method to compare the two ObjectIds because they are Mongoose ObjectId objects, not simple strings. The `equals` method correctly compares the values of the ObjectIds.

### Protect Edit and Delete Routes

```javascript
// middleware.js

// Middleware to check if the logged-in user is the owner of the listing
module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing.owner._id.equals(res.locals.currUser._id)) {
    req.flash("error", "You don't have permission to perform that action!");
    return res.redirect(`/listings/${id}`);
  }

  next();
};
```

```javascript
// routes/listing.js

// Edit Route - Form to edit an existing listing
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    if (!listing) {
      req.flash("error", "Listing you requested for does not exist!");
      res.redirect("/listings");
    } else {
      res.render("listings/edit.ejs", { listing });
    }
  })
);

// Update Route - Update an existing listing
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing }); // Destructuring to get all fields from req.body.listing
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`); // Redirect to show page
  })
);

// Delete Route - Delete a listing
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
  })
);
```

## Setting Authorization for Reviews

# Phase 3

## Part A (Controllers Structure and Upload Image / File to Cloud)

### MVC : Model View Controller

- **Model:** Stores database related logic and models.

- **View:** Stores the presentation layer, rendering templates and displaying data to users.

- **Controller:** Stores the backend logic, handling requests, processing data, and interacting with models and views.

### Controllers Structure

We'll transfer all the `callbacks` from the route files to `controllers` files.

- `controllers/listings.js` for listing related controllers.

- `controllers/reviews.js` for review related controllers.

- `controllers/users.js` for user related controllers.

---

### `router.route()` to group routes with same path

[Express Router.route()](https://expressjs.com/en/4x/api.html#router.route)

---

### Rating styling with stars

We'll use a library called `starability` to display star ratings in our application.

[Starability - Accessible star rating](https://github.com/LunarLogic/starability) | [Starability Demo](https://lunarlogic.github.io/starability/)

---

## Upload Image

### We need to set the `enctype` attribute of the form to `multipart/form-data` to enable file uploads

```html
<!-- views/listings/new.ejs -->

<form
  method="POST"
  action="/listings"
  novalidate
  class="needs-validation"
  enctype="multipart/form-data"
>
  <!-- Further Code -->
</form>
```

### Then we need a package called `Multer` to handle file uploads in our Express application

Multer is a node.js middleware for handling **`multipart/form-data`**, which is primarily used for uploading files.

[Multer Documentation](https://www.npmjs.com/package/multer)

### Installation

```bash
npm i multer
```

### Usage

**Require** and **configure** multer in `app.js`

```javascript
// routes/listing.js
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // Specify the destination folder for uploaded files
```

Use `upload.single('fieldname')` as middleware in the route where you want to handle file uploads. Here, `fieldname` is the name attribute of the file input field in your form.

```javascript
// routes/listing.js

// Create Route - Create a new listing
router.post(
  "/",
  upload.single("listing[image]") // Middleware to handle single file upload from the 'image' field
  // Further code
);
```

After using multer, the uploaded file's information will be available in `req.file`.

The informations are as follows:

| **Property**     | **Description**                                      |
| ---------------- | ---------------------------------------------------- |
| **fieldname**    | The name of the form field associated with the file. |
| **originalname** | The name of the file on the user's computer.         |
| **encoding**     | The encoding type of the file.                       |
| **mimetype**     | The MIME type of the file.                           |
| **destination**  | The folder where the file is stored.                 |
| **filename**     | The name of the file within the destination folder.  |
| **path**         | The full path to the uploaded file.                  |
| **size**         | The size of the file in bytes.                       |

### Cloud Setup

[Cloudinary](https://cloudinary.com/) is a cloud-based service that provides an end-to-end image and video management solution, including uploads, storage, manipulations, optimizations, and delivery.

#### .env file

`.env` file is used to store environment variables or credentials securely.

Data in `.env` file is stored in key-value pairs. It does not support any **quotes** **`" "`** or **`' '`** around values.

Our `.js` files can access these variables directly. We need a package called `dotenv` to load environment variables from a `.env` file into `process.env`.

[Dotenv Documentation](https://www.npmjs.com/package/dotenv)

### Installation

```bash
npm i dotenv
```

### Usage

```javascript
// app.js

if (process.env.NODE_ENV != "production") {
  require("dotenv").config(); // Load environment variables from .env file
}
console.log(process.env.Variable_name); // Access the variable
```

---

### Store Files on Cloudinary

We need 2 packages for that:

1. `cloudinary` - Official Cloudinary SDK for Node.js [Cloudinary Node.js SDK](https://www.npmjs.com/package/cloudinary)

```bash
npm i cloudinary
```

2. `multer-storage-cloudinary` - Cloudinary storage engine for Multer [Multer Storage Cloudinary](https://www.npclmjs.com/package/multer-storage-cloudinary)

```bash
npm i multer-storage-cloudinary
```

---

## Part B

### Edit Listing Image

### Preview Imaage to the edit page

[Cloudinary Image Transformations](https://cloudinary.com/documentation/image_transformations#transformation_url_syntax)

| **Transformation** | **Description**                                        |
| ------------------ | ------------------------------------------------------ |
| **c_fill**         | Crop the image to fill the specified dimensions.       |
| **ar_1.0**         | Set the aspect ratio to 1:1 (square).                  |
| **h_250**          | Set the height of the image to 250 pixels.             |
| **w_250**          | Set the width of the image to 250 pixels.              |
| **g_auto**         | Automatically determine the best gravity for cropping. |
| **e_blur:300**     | Apply a blur effect with a strength of 300.            |

> We've to use this in `url` and in `url` after `upload/` insert these transformations separated by `/`. To use multiple transformations, separate them with a comma `,`.
>
> Like, `https://res.cloudinary.com/dprtqxkq0/image/upload/ar_1.0,c_fill,h_250,e_blur:300/v1767613354/wanderlust_DEV/p8oxxug5rvally31z9g4.jpg`
