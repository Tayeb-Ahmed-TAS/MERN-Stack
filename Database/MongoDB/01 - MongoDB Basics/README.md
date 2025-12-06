# MongoDB

## 1. The Mongo Shell

### 1.1 Starting the Mongo Shell

`mongosh` command is used to start the MongoDB shell, which allows you to interact with your MongoDB databases.

```bash
mongosh
```

When we open the Mongo Shell, it creates a temporary database named "**test**" if no database is specified.

### 1.1.1 Shortcut commands of Mongo Shell (mongosh)

| Command              | Description                             |
| -------------------- | --------------------------------------- |
| `ctrl + l` or, `cls` | Clear the screen                        |
| `exit` or, `quit`    | Exit the shell                          |
| `help`               | Show help menu (All Commands)           |
| `show dbs`           | List all databases (Show Databases)     |
| `db`                 | Show current database                   |
| `show collections`   | List all collections (Show Collections) |

## 2. Create & Use a new Database

```bash
use database_name
```

If the database exists, it will switch to that database. If it does not exist, it will create a new database with the specified name and switch to it.

It is important to note that the database is not actually created until you insert some data into it. Until then, it will not appear in the list of databases.

If we **quit** the Mongo Shell without inserting any data, the database will be discarded / vanished.

## CRUD Operations

> C -> Create / Insert  
> R -> Read / Find  
> U -> Update  
> D -> Delete / Remove

## 2. **BSON** Data

In MongoDB, data inserts in a form called **BSON** (Binary JSON).

We'll insert data in **JavaScript Object** and MongoDB will convert it into **BSON** format.

| JSON (JavaScript Object Notation) | BSON (Binary JSON)        |
| --------------------------------- | ------------------------- |
| Text Based                        | Binary Based              |
| {key:value}                       | {key:value}               |
| Parsing is difficult              | Parsing is easy           |
| Space inefficient                 | Space efficient           |
| Human Readable                    | Not Human Readable        |
| Less number of data types         | More number of data types |

[More about BSON](https://www.mongodb.com/resources/basics/json-and-bson)

## 3. Document & Collection

- **Document:** Mongo stores data in form of documents (**BSON** docs. Similar to **rows** in **RDBMS**). It is a set of **key-value** pairs.

- **Collection:** MongoDB stores documents in collections (similar to **tables** in **RDBMS**).

## 4. Insert in DB (Insertion)

| Command                                      | Description                                 |
| -------------------------------------------- | ------------------------------------------- |
| `db.collection_name.insertOne(document)`     | Insert a single document                    |
| `db.collection_name.insertMany([documents])` | Insert multiple documents                   |
| -------------------------------------------- | ------------------------------------------- |
| `db.collection_name.find()`                  | Find all documents (Show all the documents) |

### 4.1 Insert a Single Document

```javascript
db.users.insertOne({ name: "John", age: 30, city: "New York" });
```

### 4.2 Insert Multiple Documents

```javascript
db.users.insertMany([
  { name: "Alice", age: 25, city: "Los Angeles" },
  { name: "Bob", age: 28, city: "Chicago" },
  { name: "Charlie", age: 32, city: "Houston" },
]);
```

**NOTE:** If the collection does not exist, MongoDB creates the collection when you first store data for that collection.

**Important:** When we insert a document, the MongoDB automatically creates a unique **id** in the `_id` field for that document and this id will be the **Primary Key** for that document.

## 5. **FIND** in DB (Read)

| Command                                      | Description                             |
| -------------------------------------------- | --------------------------------------- |
| `db.collection_name.find()`                  | Find all documents                      |
| `db.collection_name.find({ key: value })`    | Find documents based on a query         |
| `db.collection_name.findOne({ key: value })` | Find a single document based on a query |

**Note:** There has a slightly different between `find()` and `findOne()`. The `find()` method returns a **cursor** to the documents that means it returns an array and inside that array, there are one or multiple documents. The `findOne()` method returns a **single document** that matches the query, It does not return an array.

### 5.1 Find All Documents

```javascript
db.users.find();
```

### 5.2 Find Documents Based on a Query

```javascript
db.users.find({ city: "New York" });
```

or,

```javascript
db.users.find({ ciry: "Los Angeles", age: 25 });
```

### 5.3 Find a Single Document Based on a Query

```javascript
db.users.findOne({ name: "Alice" });
```

## 5.4 Query Operators in FIND

| Operator | Description              |
| -------- | ------------------------ |
| `$eq`    | Equal to                 |
| `$ne`    | Not equal to             |
| `$gt`    | Greater than             |
| `$gte`   | Greater than or equal to |
| `$lt`    | Less than                |
| `$lte`   | Less than or equal to    |
| `$in`    | In a list of values      |
| `$nin`   | Not in a list of values  |

**More about Query Operators**

[W3School](https://www.w3schools.com/mongodb/mongodb_query_operators.php) | [MongoDB Docs](https://www.mongodb.com/docs/manual/reference/mql/query-predicates/)

### Examples

**Assume collection name is `student`**

**Q - 1:** Find students where `marks > 75`

```javascript
db.student.find({ marks: { $gt: 75 } });
```

**Q - 2:** Find students who lived in **Tangail** or **Dhaka**

```javascript
db.student.find({ city: { $in: ["Tangail", "Dhaka"] } });
```

**Q - 3:** Find students who `scored > 75` or `live in Dhaka`

```javascript
db.student.find({ $or: [{ marks: { $gt: 75 } }, { city: "Dhaka" }] });
```

## 6. **Update** in DB (Update)

| Command                                                        | Description                             |
| -------------------------------------------------------------- | --------------------------------------- |
| `db.collection_name.updateOne(<filter>, <update>, <options>)`  | Update a single document                |
| `db.collection_name.updateMany(<filter>, <update>, <options>)` | Update multiple documents               |
| --------------------------------------------                   | --------------------------------------- |
| `db.collection_name.replaceOne(<filter>, <replacement>)`       | Replace a single document               |

**Note:** **`options`** parameter is optional. It can be used to specify additional options for the update operation.

### Examples

**Q - 1:** Update a single document where `name` is `"Taskin"` to set `city` to `"Basail"`.

```javascript
db.users.updateOne({ name: "Taskin" }, { $set: { city: "Basail" } });
```

**Point to be noted:** The `$set` operator is used to specify the fields to update. If the field does not exist, it creates a new field with the specified value. If it exists, it will be updated with the new value.

**Q - 2:** Update multiple documents where `city` is `"Dhaka"` to set `city` to `"Chattogram"`.

```javascript
db.users.updateMany({ city: "Dhaka" }, { $set: { city: "Chattogram" } });
```

**Q - 3:** Replace a single document where `name` is `"Alice"` with a new document.

```javascript
db.users.replaceOne(
  { name: "Alice" },
  { name: "Alicia", age: 26, city: "San Francisco" }
);
```

**Point to be noted:** The `replaceOne()` method replaces the entire document with the new document provided except for the `_id` field, which remains unchanged.

## 7. **Nesting**

To access the nested fields, we can use dot notation.

Assume the following document in the `student` collection:

```javascript
  {
    _id: ObjectId('6933e48bec1f7ea9d11e2621'),
    name: 'Farah',
    performance: { marks: 77, grade: 'A' }
  }
```

To access this with marks:

```javascript
db.student.find({ "performance.marks": 77 });
```

## 8. **Delete** in DB (Deletion)

| Command                                              | Description               |
| ---------------------------------------------------- | ------------------------- |
| `db.collection_name.deleteOne(<filter>, <options>)`  | Delete a single document  |
| `db.collection_name.deleteMany(<filter>, <options>)` | Delete multiple documents |
| ---------------------------------------------------  | ------------------------  |
| `db.dropDatabase()`                                  | Drop the current database |
| `db.collection_name.drop()`                          | Drop a collection         |
| ---------------------------------------------------  | ------------------------  |

**NOTE:** **`options`** parameter is optional. It can be used to specify additional options for the delete operation.

### Examples

**Assume the collection name is `student`**

**Q - 1:** Delete a single document where `city` is `"Chattogram"`.

```javascript
db.student.deleteOne({ city: "Chattogram" });
```

**Q - 2:** Delete students who scored less than `40` marks.

```javascript
db.student.deleteMany({ marks: { $lt: 40 } });
```

**Assume the `student` collection has one document like following:**

```javascript
  {
    _id: ObjectId('6933e48bec1f7ea9d11e2621'),
    name: 'Farah',
    performance: { marks: 77, grade: 'A' }
  }
```

**Q - 3:** Delete students who scored less than `88` marks.

```javascript
db.student.deleteMany({
  $or: [{ marks: { $lt: 88 } }, { "performance.marks": { $lt: 88 } }],
});
```

### Empty a Collection

To delete all documents from a collection without dropping the collection itself, you can use the `deleteMany()` method with an empty filter `{}`.

```javascript
db.collection_name.deleteMany({});
```
