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

At 1st create a database in MySQL Workbench named `delta_app`.

Then use the following code to connect Node.js with MySQL database.

```sql
CREATE DATABASE delta_app;
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
  database: "test",
  password: "your_database_password",
});

        ---
---
```
