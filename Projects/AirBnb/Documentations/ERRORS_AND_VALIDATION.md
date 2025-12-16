# Errors Handling and Validation

## 1. Form Validations

When we enter data in the form, the browser and/or the web server will check to see that the data is in the **_correct format_** and **_within the constraints_** set by the application.

There are **2** types of form validations:

- **Client-Side Validation**: Implemented using JavaScript to provide immediate feedback to users. This includes checking for required fields, valid email formats, password strength, etc.

- **Server-Side Validation**: Implemented on the server to ensure data integrity and security. This includes validating data types, lengths, and formats before processing or storing them in the database.

---

# Client-Side Validation

For that in our form we'll not only use `required` attribute in our input fields, but also we'll use **_Bootstrap_** styling for validation. So that, all the browser shows the same validation styles.

> In our form, we have added the `novalidate` attribute to the `<form>` tag to disable the browser's default validation. This allows us to implement custom validation styles using Bootstrap. And we have added the `needs-validation` class to the `<form>` tag to indicate that this form requires validation. And we must add `required` attribute to all the input fields that are mandatory. And finally, we have added a JavaScript code to handle the validation styles when the form is submitted. The script code is available in the Bootstrap documentation link below.

[Bootstrap Form Validation Documentation](https://getbootstrap.com/docs/5.3/forms/validation/)

---

# Server-Side Validation

## Error Page (error.ejs)

[Bootstrap Alerts Documentation](https://getbootstrap.com/docs/5.3/components/alerts/)

---

## Schema Validation

We'll use a tool name `joi` for schema validation.

[Joi Documentation](https://joi.dev/api/?v=17.13.3) | [Joi in NPM](https://www.npmjs.com/package/joi)

First, install `joi` package using npm.

```bash
npm install joi
```

Then we've to require it in our `app.js` file.

```javascript
const Joi = require("joi");
```

After that, we've to define a schema. It'll not a mongodb schema, it's a server-side validation schema.

Example for our `listing` schema:

[schema.js](../schema.js)

```javascript
// schema.js
const Joi = require("joi");

const listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().required().min(0), // Price must be a non-negative number
    image: Joi.string().allow("", null), // It means image field is optional and it can accept empty string or null
  }).required(),
});

module.exports = { listingSchema };
```

Then we've to require this schema in our `app.js` file.

```javascript
// app.js
const { listingSchema } = require("./schema");
```

Now, we've to use `listingSchema.validate()` method to validate the incoming data in our POST and PUT routes for listings.

```javascript
listingSchema.validate(req.body);
```
