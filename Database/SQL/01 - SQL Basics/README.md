# SQL Basics

## SQL Data Types

| Data Type   | Description                                                        | Usage          |
| ----------- | ------------------------------------------------------------------ | -------------- |
| **CHAR**    | string(0-255), can store characters of fixed length                | `CHAR(50)`     |
| **VARCHAR** | string(0-255), can store characters up to given length             | `VARCHAR(100)` |
| **BLOB**    | string(0-65535), can store binary large object                     | `BLOB(1000)`   |
| **INT**     | integer( -2, 147, 483, 648 to 2, 147, 483, 647)                    | `INT`          |
| **TINYINT** | integer( -128 to 127)                                              | `TINYINT`      |
| **BIGINT**  | integer( -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807)  | `BIGINT`       |
| **BIT**     | can store x-bit values. x can range from 1 to 64                   | `BIT(2)`       |
| **FLOAT**   | Decimal number - with precision to 23 digits                       | `FLOAT`        |
| **DOUBLE**  | Decimal number - with precision to 53 digits                       | `DOUBLE`       |
| **BOOLEAN** | Boolean values 0 or 1                                              | `BOOLEAN`      |
| **DATE**    | Date in format of YYYY-MM-DD ranging from 1000-01-01 to 9999-12-31 | `DATE`         |
| **YEAR**    | year in 4 digits format ranging from 1901 to 2155                  | `YEAR`         |

[SQL Data Types Reference](https://www.w3schools.com/sql/sql_datatypes.asp) for more datatypes and details.

## Database Queries

### 1.1 Database Basic Commands

```sql
-- Create Database
CREATE DATABASE database_name;

-- Create Database If Not Exists
CREATE DATABASE IF NOT EXISTS database_name;

-- Drop Database
DROP DATABASE database_name;

-- Drop Database If Exists
DROP DATABASE IF EXISTS database_name;

-- Show Databases
SHOW DATABASES;

-- Show Tables
SHOW TABLES;

-- Use Database
USE database_name;
```

### 1.2 Table Create Command

```sql
CREATE TABLE table_name (
    column_name1 datatype constraint,
    column_name2 datatype constraint,
    column_name3 datatype constraint,
   ....
);
```

### 1.2.1 Constraints

Rules for data in the table columns.

| Sl  | Constraint Name | Description                                              |
| --- | --------------- | -------------------------------------------------------- |
| 1   | **NOT NULL**    | Columns cannot have a NULL value.                        |
| 2   | **UNIQUE**      | All values in the column are different / unique.         |
| 3   | **CHECK**       | Ensures that all values in a column satisfy a condition. |
| 4   | **DEFAULT**     | Sets a default value for a column.                       |

### 1.2.2 Key Constraints

| Sl  | Key Constraint Name | Description                                              |
| --- | ------------------- | -------------------------------------------------------- |
| 1   | **PRIMARY KEY**     | Makes a column unique & not null but used only for one.  |
| 2   | **FOREIGN KEY**     | Prevent actions that would distroy links between tables. |

> **Foreign Key** is the **Primary Key** of another table.

### 1.2.2.1 Primary Key Example

```sql
CREATE TABLE Employees (
    ID INT PRIMARY KEY,
    Name VARCHAR(100),
    Age INT
);
```

**OR,**

```sql
CREATE TABLE Employees (
    ID INT,
    Name VARCHAR(100),
    Age INT,
    PRIMARY KEY (ID)
);
```

### 1.2.2.2 Foreign Key Example

```sql
-- Depart Table

CREATE TABLE Departments (
    DeptID INT PRIMARY KEY,
    DeptName VARCHAR(100)
);
```

```sql
-- Employee Table

CREATE TABLE Employees (
    EmpID INT PRIMARY KEY,
    EmpName VARCHAR(100),
    DeptID INT,
    FOREIGN KEY (DeptID) REFERENCES Departments(DeptID)
);
```

### 1.3 Example of Constraints

```sql
-- User Table

CREATE TABLE user(
    id INT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    age INT CHECK (age>=16 ),
    email VARCHAR(100) UNIQUE,
    followers INT DEFAULT 0,
    following INT DEFAULT 0
);
```

```sql
-- post Table

CREATE TABLE post(
    id INT PRIMARY KEY,
    content VARCHAR(100),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id)
);
```

---

## 2. Primary Key

It is a column (or set of columns) in a table that uniquely indetifies each row. (a unique id)

There is only 1 PK & it should be **unique** & **NOT null**.

## 3. Foreign Key

A foreign key is a column (or set of columns) in a table that refers to the primary key in another table.

**FK**s can have **duplicate** and **null** values.

There can be multiple **FK**s in a table.

---

## 4. Insert Data into Table

### 4.1 Syntax

```sql
INSERT INTO table_name
(column1, column2, column3, ...)
VALUES
(value1, value2, value3, ...),
(value1, value2, value3, ...);
```

### 4.2 Example

```sql
INSERT INTO user (id, name, age, email, followers, following)
VALUES
(1, 'Alice', 25, 'alice@example.com', 100, 150),
(2, 'Bob', 30, 'bob@example.com', 200, 250),
(3, 'Charlie', 22, 'charlie@example.com', 150, 100),
(4, 'David', 28, 'david@example.com', 180, 130);
```

---

## 5. Select Command

### 5.1 Syntax

```sql
SELECT column1, column2, ...
FROM table_name;
```

### 5.2 Syntax to select all columns

```sql
SELECT * FROM user;
```

### 5.3 Syntax to select distinct values

**Distinct** shows only unique values.

```sql
SELECT DISTINCT column_name
FROM table_name;
```
