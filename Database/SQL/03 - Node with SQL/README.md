# Node with SQL

## 1. Faker Package

**Faker** is a library that generates fake data for you. It can be used to populate databases, create realistic test data, and more.

### Installation

To install Faker, you can use npm. Run the following command in your terminal:

```bash
npm i @faker-js/faker
```

### Usage

[Faker Documentation](https://www.npmjs.com/package/@faker-js/faker)

## 2. MySQL2 Package

To connect Node.js with MySQL.

### Installation

[MySQL2 Documentation](https://www.npmjs.com/package/mysql2) | and | [MySQL2 Usage](https://sidorares.github.io/node-mysql2/docs#first-query)

```bash
npm i mysql2
```

At 1st create a database in MySQL Workbench named `delta_app`, and create a table.

```sql
CREATE DATABASE delta_app;

USE delta_app;

-- Create table here

```

Then use the following code to connect Node.js with MySQL database.

```js
// index.js
---
    ---

const mysql = require("mysql2");

// Create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "delta_app",
  password: "your_database_password",
});

        ---
---
```

## 3. Use Database

There're 4 ways to use MySQL database with Node.js.

### Way - 1. Using MySQL Workbench

### Way - 2. Callback

```js
// index.js
---
    ---

try{
    connection.query("SHOW TABLES" , (err, result, fields) => {
      // fields used in SELECT queries
      if (err) throw err;
        console.log(result);
    });
}catch(err){
    console.log(err);
}

        ---
---

```

### To end the MySQL connection

```js
connection.end();
```

### Way - 3. MySQL CLI

```bash
/c/Program\ Files/MySQL/MySQL\ Server\ 8.0/bin/mysql -u root -p
```

Enter your database password when prompted.

Then just write queries there. Like following:

```sql
USE delta_app;
```

#### To exit MySQL CLI

```sql
quit
```

### Way - 4. Using SQL Files

At first create a SQL file named `file_name.sql` and write your queries there. Like following:

```sql
USE delta_app;

-- Your queries here

```

Then run the following command in your terminal:

```bash
/c/Program\ Files/MySQL/MySQL\ Server\ 8.0/bin/mysql -u root -p
```

Enter your database password when prompted.

Then run the following command to execute the SQL file:

```bash
source file_name.sql
```

## **NOTE:** We'll use our index.js file to use our database

## Insert into Table

We use `placeholder` (`?`) to insert data into table. And separate using comma (`,`) and provide values in an array.

### Insert Single Row

```js
// index.js
---
    ---
let q = "INSERT INTO table_name (column1, column2) VALUES (?, ?)";
let user=['value1', 'value2'];

connection.query(q, user, (err, result) => {
console.log(result);
});
    ---
---
```

### Insert Multiple Rows (Array of Arrays)

```js
// index.js
---
    ---
let q = "INSERT INTO table_name (column1, column2) VALUES ?";
let users = [
    ['value1a', 'value2a'],
    ['value1b', 'value2b'],
    ['value1c', 'value2c']
];

connection.query(q, [users], (err, result) => {
console.log(result);
});
    ---
---

```

### Insert Bulk Data Using Faker Package

```js
---
    ---
let q = "INSERT INTO table_name (column1, column2) VALUES ?";
let users = [
    ['value1a', 'value2a'],
    ['value1b', 'value2b'],
    ['value1c', 'value2c']
];

connection.query(q, [users], (err, result) => {
console.log(result);
});
    ---
---
```
