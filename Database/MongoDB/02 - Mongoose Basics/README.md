# Mongoose

A libary that **creates a connection** between MongoDB & Node.js JavaScript Runtime Environment.

It is an **ODM (Object Data Modeling)** library.

[mongoose](https://www.npmjs.com/package/mongoose)

[Mongoose Documentation](https://mongoosejs.com/docs/index.html) | [Mongoose](https://mongoosejs.com/)

## At first we've to start MongoDB server

```bash
net start MongoDB
```

### TO stop MongoDB server

```bash
net stop MongoDB
```

## Install Mongoose

```bash
npm i mongoose
```

## 1. Create a connection to MongoDB server

```javascript
const mongoose = require("mongoose");

main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

async function main() {
  // Connect to MongoDB
  await mongoose.connect("mongodb://127.0.0.1:27017/test");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
```

## 2. Schema

Schema defines the shape of the documents within a collection. It is a blueprint of how the data should look.

### Define a schema

```javascript
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
});
```

## 3. Model

Model in mongoose is a class with which we construct documents. It is a wrapper on the schema.

### Create a model

**Syntax:**

```javascript
const Model = mongoose.model("collection_name", schema_name);
```

**NOTE**: Usually we use the **_collection_name_** same as the **Model** name.

**Example:**

```javascript
const User = mongoose.model("User", userSchema);
```

**Point to be noted:** We've to give the collection_name in **singular** form. Mongoose will automatically create the collection in **plural** form. And we've to give the letter in **Uppercase** in collection_name. Mongoose will automatically convert it to **lowercase**.

**E.g.** If we give the collection_name as "User", mongoose will create the collection as "users".

## 4. Insert in Mongoose

### 4.1 Inserting One

### Step 1: Create a document

**Syntax:**

This is a object representation of a document beacuse Model is a class.

```javascript
const document = new Model({
  key1: value1,
  key2: value2,
  ...
});
```

**Example:**

```javascript
const user1 = new User({
  name: "John Doe",
  age: 30,
  email: "john.doe@example.com",
});
```

### Step 2: Save the document to the collection

**Syntax:**

```javascript
document.save();
```

**Example:**

```javascript
user1.save();
```

## Complete Example: Inserting One Document

```javascript
const mongoose = require("mongoose");
main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));
async function main() {
  // Connect to MongoDB server
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

// Define a schema
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
});

// Create a model
const User = mongoose.model("User", userSchema);

// Create a document
const user1 = new User({
  name: "John Doe",
  age: 30,
  email: "john.doe@example.com",
});

// Save the document to the collection
user1
  .save()
  .then((res) => {
    console.log("User saved successfully");
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
```

---

### 4.2 Inserting Many

**Syntax:**

```javascript
Model.insertMany([
  {
    key1: value1,
    key2: value2,
    ...
  },
  {
    key1: value1,
    key2: value2,
    ...
  },
  ...
]).then((res) => {
  // success callback
}).catch((err) => {
  // error callback
});
```

**Example:**

```javascript
User.insertMany([
  { name: "Alice Smith", age: 25, email: "alice.smith@example.com" },
  { name: "Bob Johnson", age: 28, email: "bob.johnson@example.com" },
  { name: "Charlie Brown", age: 22, email: "charlie.brown@example.com" },
])
  .then((res) => {
    console.log("Users inserted successfully");
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
```

**Note:** It doesn't need the `save()` method to save the documents when we use the `insertMany()` method.

---

## Operation Buffering

Mongoose uses **Operation Buffering**.

Mongoose let's you start using your models immediately, without waiting for mongoose to establish a connection to MongoDB.

---

## 4. Find in Mongoose

[Mongoose Find Documentation](https://mongoosejs.com/docs/api/model.html)

| Method             | Description                            |
| ------------------ | -------------------------------------- |
| `Model.find()`     | Finds documents matching the query.    |
| `Model.findOne()`  | Finds one document matching the query. |
| `Model.findById()` | Finds a document by its `_id` field.   |

### 4.1 Model.find()

`Model.find()` returns a Query Object (thennable).

Mongoose Queries are not **_promises_**. But they have a `.then()`.

```javascript
// Find all users
User.find({})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log("Error finding users:", err);
  });
```

```javascript
// Find users with whose age is greater than 25
User.find({ age: { $gt: 25 } })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log("Error finding users:", err);
  });
```

```javascript
// Find name of the user whose age is greater than 29
User.find({ age: { $gt: 29 } })
  .then((res) => {
    console.log(res[].name);
  })
  .catch((err) => {
    console.log("Error finding users:", err);
  });
```

### 4.2 Model.findOne()

```javascript
// Find one user with whose age is greater than 25
User.findOne({ age: { $gt: 25 } })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log("Error finding users:", err);
  });
```

```javascript
// Find user by ID
User.findOne({ _id: "69367a33aeb2b1d5d8017232" })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log("Error finding users:", err);
  });
```

### 4.3 Model.findById()

```javascript
// Find user by ID
User.findById("69367a33aeb2b1d5d8017232")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log("Error finding users:", err);
  });
```

---

## 5. Update in Mongoose

### 5.1 Model.updateOne()

```javascript
// Update the age of user whose name is "Kritika" to 31
User.updateOne({ name: "Kritika" }, { age: 31 })
  .then((res) => {
    console.log("User updated successfully");
    console.log(res);
  })
  .catch((err) => {
    console.log("Error updating user:", err);
  });
```

Here, `{ name: "Kritika" }` is the filter & `{ age: 31 }` is the update.

**Note:** In mongoose, we don't need to use `$set` operator while updating.

### 5.2 Model.updateMany()

```javascript
// Update the age of all users whose age is less than 25 to 26
User.updateMany({ age: { $lt: 25 } }, { age: 26 })
  .then((res) => {
    console.log("Users updated successfully");
    console.log(res);
  })
  .catch((err) => {
    console.log("Error updating users:", err);
  });
```

Here, `{ age: { $lt: 25 } }` is the filter & `{ age: 26 }` is the update.

### 5.3 Mode.findOneAndUpdate()

```javascript
// Find user whose name is "Alice Smith" and update her age to 27
User.findOneAndUpdate({ name: "Alice Smith" }, { age: 27 })
  .then((res) => {
    console.log("User updated successfully");
    console.log(res);
  })
  .catch((err) => {
    console.log("Error updating user:", err);
  });
```

It will find the first document that matches the filter and update it.

If we want to get the updated document as a result, then we've to pass an options object with `{ new: true }`.

```javascript
// Find user whose name is "Alice Smith" and update her age to 27
User.findOneAndUpdate({ name: "Alice Smith" }, { age: 27 }, { new: true })
  .then((res) => {
    console.log("User updated successfully");
    console.log(res);
  })
  .catch((err) => {
    console.log("Error updating user:", err);
  });
```

### 5.4 Model.findByIdAndUpdate()

```javascript
// Find user by ID and update her age to 28
User.findByIdAndUpdate("69367a33aeb2b1d5d8017232", { age: 28 })
  .then((res) => {
    console.log("User updated successfully");
    console.log(res);
  })
  .catch((err) => {
    console.log("Error updating user:", err);
  });
```

It will find the document by its `_id` field first and update it.

If we want to get the updated document as a result, then we've to pass an options object with `{ new: true }`.

```javascript
// Find user by ID and update her age to 28
User.findByIdAndUpdate("69367a33aeb2b1d5d8017232", { age: 28 }, { new: true })
  .then((res) => {
    console.log("User updated successfully");
    console.log(res);
  })
  .catch((err) => {
    console.log("Error updating user:", err);
  });
```

---

## 6. Delete in Mongoose

### 6.1 Model.deleteOne()

```javascript
// Delete user whose name is "Bob Johnson"
User.deleteOne({ name: "Bob Johnson" })
  .then((res) => {
    console.log("User deleted successfully");
    console.log(res);
  })
  .catch((err) => {
    console.log("Error deleting user:", err);
  });
```

### 6.2 Model.deleteMany()

```javascript
// Delete all users whose age is greater than 28
User.deleteMany({ age: { $gt: 28 } })
  .then((res) => {
    console.log("Users deleted successfully");
    console.log(res);
  })
  .catch((err) => {
    console.log("Error deleting users:", err);
  });
```

### 6.3 Model.findOneAndDelete()

```javascript
// Find user whose name is "Charlie Brown" and delete
User.findOneAndDelete({ name: "Charlie Brown" })
  .then((res) => {
    console.log("User deleted successfully");
    console.log(res);
  })
  .catch((err) => {
    console.log("Error deleting user:", err);
  });
```

### 6.4 Model.findByIdAndDelete()

```javascript
// Find user by ID and delete
User.findByIdAndDelete("69367a33aeb2b1d5d8017232")
  .then((res) => {
    console.log("User deleted successfully");
    console.log(res);
  })
  .catch((err) => {
    console.log("Error deleting user:", err);
  });
```

---

## 7. Schema Validation

Basically, Rules for Schema.

```javascript
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  ptice: {
    type: Number,
  },
});
```

[Mongoose Schema Validation Documentation](https://mongoosejs.com/docs/schematypes.html)

### 7.1 Schema Type Options

[Mongoose SchemaType Options Documentation](https://mongoosejs.com/docs/schematypes.html#schematype-options)

| Option      | Description                                             |
| ----------- | ------------------------------------------------------- |
| `type`      | Specifies the data type of the field.                   |
| `required`  | If true, the field is required.                         |
| `default`   | Specifies a default value for the field.                |
| `lowercase` | Converts the string to lowercase before saving.         |
| `uppercase` | Converts the string to uppercase before saving.         |
| `enum`      | Specifies an array of allowed values for String fields. |
| `maxlength` | Specifies the maximum length for String fields.         |
| `minlength` | Specifies the minimum length for String fields.         |
| `min`       | Specifies the minimum value for Number fields.          |
| `max`       | Specifies the maximum value for Number fields.          |

## 8. Update Schema Validation

The rules we defined while creating the schema cann't applied when we update the document using update methods.

To apply the schema validation while updating, we've to pass an options object with `{ runValidators: true }`.

```javascript
Book.findByIdAndUpdate(
  "69367a33aeb2b1d5d8017232",
  { title: "New Book Title" },
  { runValidators: true }
)
  .then((res) => {
    console.log("Book updated successfully");
    console.log(res);
  })
  .catch((err) => {
    console.log("Error updating book:", err);
  });
```

---
