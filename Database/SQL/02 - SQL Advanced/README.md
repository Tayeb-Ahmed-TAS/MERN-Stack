# SQL Advanced

## 1. Clauses

### 1.1 WHERE Clause

The `WHERE` clause is used to filter records that meet certain conditions. It is used in conjunction with `SELECT`, `UPDATE`, `DELETE`, etc.

**Example:**

```sql
SELECT * FROM Employees
WHERE age > 30;
```

## 2. Operators

> SQL supports various operators to perform comparisons in the `WHERE` clause:

| Operator Name        | Operators                                                 |
| -------------------- | --------------------------------------------------------- |
| Arithmetic Operators | `+`, `-`, `*`, `/`, `%`                                   |
| Comparison Operators | `=`, `!=`, `<`, `>`, `<=`, `>=`                           |
| Logical Operators    | `AND`, `OR`, `NOT`, `IN`, `BETWEEN`, `ALL`, `LIKE`, `ANY` |
| Bitwise Operators    | `&` (Bitwise AND), (Bitwise OR)                           |

## 2.1 Frequently Used Logical Operators

### 2.1.1 AND Operator

The `AND` operator used to check for both conditions to be true.

```sql
SELECT * FROM Employees
WHERE age > 30 AND department = 'Sales';
```

### 2.1.2 OR Operator

The `OR` operator is used to check for one of the conditions to be true.

```sql
SELECT * FROM Employees
WHERE age < 25 OR department = 'Marketing';
```

### 2.1.3 BETWEEN Operator

The `BETWEEN` operator selects for a given range.

```sql
SELECT * FROM Employees
WHERE age BETWEEN 25 AND 35;
```

### 2.1.4 IN Operator

The `IN` operator matches any value in the list.

```sql
SELECT * FROM user
WHERE email IN ('example1@example.com', 'example2@example.com', 'example3@example.com');
```

### 2.1.5 NOT Operator

The `NOT` operator is used to negate the given condition.

```sql
SELECT * FROM user
WHERE age NOT IN (25, 30, 35);
```

## 3. LIMIT Clause

The `LIMIT` clause sets an upper limit on number of (tuples) rows to be returned.

**Syntax:**

```sql
SELECT column1, column2, ...
FROM table_name
LIMIT number;
```

**Example - 1:**

```sql
SELECT * FROM user
LIMIT 10;
```

**Example - 2:**

```sql
SELECT * FROM user
WHERE age > 25
LIMIT 5;
```

## 4. ORDER BY Clause

To sort in ascending (`ASC`) or descending (`DESC`) order.

**Syntax:**

```sql
SELECT column1, column2, ...
FROM table_name
ORDER BY column1 ASC;
```

## 5. Aggregate Functions

Aggregate functions perform a calculation on a set of values and return a single value.

| Function Name | Description                                   | Syntax                                |
| ------------- | --------------------------------------------- | ------------------------------------- |
| COUNT         | Returns the number of rows                    | `SELECT COUNT(*) FROM table;`         |
| SUM           | Returns the total sum of a numeric column     | `SELECT SUM(column_name) FROM table;` |
| AVG           | Returns the average value of a numeric column | `SELECT AVG(column_name) FROM table;` |
| MIN           | Returns the smallest value                    | `SELECT MIN(column_name) FROM table;` |
| MAX           | Returns the largest value                     | `SELECT MAX(column_name) FROM table;` |

## 6. GROUP BY Clause

Groups rows that have the same values into summary rows.

It collects data from multiple records (rows) and groups the results by one or more columns.

**NOTE:** Generally we use `GROUP BY` with some aggregate functions (like `COUNT`, `SUM`, `AVG`, etc.)

**Syntax:**

```sql
SELECT column1, column2
FROM table_name
GROUP BY column_name;
```

**Example:**

```sql
SELECT COUNT(id) AS total_users, age
FROM user
GROUP BY age;
```

## 7. HAVING Clause

Aimilar to `WHERE`i.e. applies some condition on rows.

But it is used when we want to apply any **condition after grouping**.

- `WHERE` is for the table, `HAVING` is for a group.

- Grouping is necessary for `HAVING` clause.

**Syntax:**

```sql
SELECT col1, col2
FROM table_name
GROUP BY col_name
HAVING condition;
```

**Example:**

```sql
SELECT age, MAX(followers)
FROM user
GROUP BY age
HAVING MAX(followers) >= 150;
```

## 8. General Order

```sql
SELECT column(s)
FROM table_name
WHERE condition
GROUP BY column(s)
HAVING condition
ORDER BY column(s) ASC;
```

---

# Table Queries

## i. UPDATE (To update existing rows)

```sql
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
```

## ii. DELETE (To delete existing rows)

```sql
DELETE FROM table_name
WHERE condition;
```

## iii. ALTER TABLE (To change the schema)

### iii.i Add Column

```sql
ALTER TABLE table_name
ADD COLUMN column_name datatype constraint;
```

### iii.ii Drop Column

```sql
ALTER TABLE table_name
DROP COLUMN column_name;
```

### iii.iii Rename Column

```sql
ALTER TABLE table_name
CHANGE COLUMN old_column_name new_column_name datatype;
```

### iii.iv Rename Table

```sql
ALTER TABLE table_name
RENAME TO new_table_name;
```

## iv. TRUNCATE (To delete all rows)

```sql
TRUNCATE TABLE table_name;
```

---

### Practice Question

Assume the following `student` table:

| roll_no | name  | city   | marks |
| ------- | ----- | ------ | ----- |
| 110     | Adam  | Delhi  | 76    |
| 108     | Bob   | Mumbai | 65    |
| 124     | Casey | Pune   | 94    |
| 112     | Duke  | Pune   | 80    |

**Question:** Add a new column `grade`, assign grades such that:

        - marks > 80, grade = "O"
        - marks 70 - 80, grade = "A"
        - marks 60 - 70, grade = "B"

**Solution:**

- Step 1: Add the new column 'grade'

```sql
ALTER TABLE student
ADD COLUMN grade CHAR(2);
```

- Step 2: Update the 'grade' column based on 'marks'

```sql
UPDATE student
SET grade = "O"
WHERE marks > 80;

UPDATE student
SET grade = "A"
WHERE marks BETWEEN 70 AND 80;

UPDATE student
SET grade = "B"
WHERE marks BETWEEN 60 AND 70;
```

- Step 2: Or, Using CASE statement

```sql
UPDATE student
SET grade = CASE
                WHEN marks > 80 THEN 'O'
                WHEN marks BETWEEN 70 AND 80 THEN 'A'
                WHEN marks BETWEEN 60 AND 70 THEN 'B'
            END;
```
