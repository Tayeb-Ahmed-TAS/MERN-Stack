# Mongo Relationships

## One-to-Many Relationship

1. **One to Few** relationship
2. **One to Many** relationship
3. **One to Squillions** relationship

## 1. One to Few Relationship

Here we store the child document inside the parent document.

This type of relationship is useful when the number of child documents is limited and small (We can't use a model separately for child documents).

For example, **Zomato**, **Uber**, **Pathao**, **Food Panda** etc. where a user can have few addresses like home, office, hostel, etc.

```javascript
{
    _id: ObjectID("..."),
    username: "sherlockholmes",
    addresses: [
        {location: "221B Baker Street", city:"London"},
        {location: "P36 DownTown", city:"London"}
    ],
    __v: 1
}
```

Here, the `addresses` field are child documents stored inside the parent document `user`.

To create the upper model [One to Few/user.js](One%20to%20Few/user.js):

---

## 2. One to Many Relationship

Here we store the reference to the child document inside the parent document.

This type of relationship is useful when the number of child documents is large and unbounded (We use a model separately for child documents).

For example, **Instagram**, **Facebook**, **Twitter (X)**, **Zomato** etc. where a user can have many posts, orders, comments, etc.

```javascript
{
    _id: ObjectID("..."),
    username: "sherlockholmes",
    orders: [
        ObjectID("..."),
        ObjectID("..."),
        ObjectID("...")
    ],
    __v: 0
}
```

To define `ObjectId` as a type in Mongoose schema, we use `Schema.Types.ObjectId`. [Populate](https://mongoosejs.com/docs/populate.html) is a Mongoose method that allows us to reference documents in other collections.

We also have to define `ref` property to tell Mongoose which model to use during population. In this case, we are referencing the `Order` model.

To create the upper model [One to Many/customer.js](One%20to%20Many/customer.js)

## Populate

Population is the process of automatically replacing the specified paths in the document with document(s) from other collection(s).

[Populate](https://mongoosejs.com/docs/populate.html) is a Mongoose method that allows us to reference documents in other collections.

For clarity , consider the following example:

```javascript
  {
    _id: ObjectId('694252c1f982e183c0d024a6'),
    name: 'Tony Stark',
    orders: [
      ObjectId('69424edfd8f96c9d353f6a54'),
      ObjectId('69424edfd8f96c9d353f6a56')
    ],
    __v: 0
  }
```

If we want to get the details of all orders placed by Tony Stark, we can use the `populate` method. For that, we've to use `.populate('referenceFieldName')` on the query.

```javascript
let result = await Customer.find({}).populate("orders");
console.log(result[0]);
```

[show_data.js](Populate/show_data.js) file demonstrates how to use the `populate` method to fetch customer data along with their associated orders.

---

## 3. One to Squillions Relationship

Here, we store a reference to the parent document inside child.

This type of relationship is useful when the number of child documents is extremely large (We can't store references to all child documents in the parent document).

For example, **YouTube**, **Instagram**, **Facebook**, **Twitter (X)** etc. where a user can have squillions of posts, comments, likes, etc.

```javascript
{
    _id: ObjectID("..."),
    content: "Hello World!",
    likes: 7,
    user: ObjectID("651df1c2e3b4a5b6c7d8e9f0"),
    __v: 0
},
{
    _id: ObjectID("..."),
    content: "Bye bye :)",
    likes: 23,
    user: ObjectID("651df1c2e3b4a5b6c7d8e9f0"),
    __v: 0
}
```

To create the upper model [One to Squillions/posts.js](One%20to%20Squillions/posts.js)

---

## Final Documentation of mongoDB Schema Design

[MongoDB Schema Design](https://mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design)

| Value of cardinality (N) | Relationship Type     | Description                               | Example Use Cases                      | Storage Method                                |
| ------------------------ | --------------------- | ----------------------------------------- | -------------------------------------- | --------------------------------------------- |
| **< 100**                | **One to Few**        | Limited number of child documents         | User addresses, product specifications | Embed child documents within parent           |
| **100-1000**             | **One to Many**       | Large number of child documents           | User posts, orders, comments           | Store references to child documents in parent |
| **> 1000**               | **One to Squillions** | Extremely large number of child documents | Social media posts, likes, followers   | Store reference to parent in child documents  |

---

## Handling Deletions in Relationships

Using **_Mongoose Middleware_**.

[Mongoose Middleware](https://mongoosejs.com/docs/middleware.html) -> Query Middleware
We can use **2** middlewares:

- **Pre** - run before the query is executed [visit](https://mongoosejs.com/docs/middleware.html#pre)

- **Post** - run after the query is executed [visit](https://mongoosejs.com/docs/middleware.html#post)

> **Remember that,** `findByIdAndDelete()` internally calls `findOneAndDelete()` method. So, we have to use middleware on `findOneAndDelete()` method. Query middleware don't have `findByIdAndDelete()` and `findByIdAndUpdate()` methods. Instead, they use `findOneAndDelete()` and `findOneAndUpdate()` methods respectively. But we can still call `findByIdAndDelete()` and `findByIdAndUpdate()` methods as usual because they internally call `findOneAndDelete()` and `findOneAndUpdate()` methods.

### Pre Middleware

Syntax:

```javascript
Schema_name.pre("methodName", function (next) {
  // Middleware logic
  next();
});
```

We can use pre middleware to delete all associated child documents before deleting a parent document.

### Post Middleware

Syntax:

```javascript
Schema_name.post("methodName", function (data) {
  // Middleware logic
});
```

We can use post middleware to log information or perform actions after a parent document has been deleted.
