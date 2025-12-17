# SQL Relationships

In SQL, relationships works via **_Foreign Keys_**.

## One to One Relationship (1 x 1)

One to One relationship means that a record in one table is linked to one and only one record in another table.

```nginx
┌────────────┬──────────────┬────────────────┐
│ PK         │              │ FK             │
├────────────┼──────────────┼────────────────┤
│ user_id    │ name         │ profile_id     │──────────────────┐
├────────────┼──────────────┼────────────────┤                  │
│ 101        │ Rahul        │ 201            │                  │
│ 102        │ Aisha        │ 202            │                  │
└────────────┴──────────────┴────────────────┘                  │
                                                                │
                                                                │
    ────────────────────────────────────────────────────────────|
    │
    ▼
┌──────────────┬──────────────┐
│ PK           │              │
├──────────────┼──────────────┤
│ profile_id   │ role         │
├──────────────┼──────────────┤
│ 201          │ Developer    │
│ 202          │ Designer     │
└──────────────┴──────────────┘

```

### 🧠 Visual Rule

```sql
User 101 ─────────▶ Profile 201
User 102 ─────────▶ Profile 202
```

## One to Many Relationship (1 x N)

One-to-Many means one record in a table is linked to multiple records in another table.

```nginx
┌───────────────────────┐
│         USERS         │
├────────────┬──────────┤
│ PK         │          │
│ user_id    │ name     │
├────────────┼──────────┤
│ 101        │ Rahul    │
│ 102        │ Aisha    │
└────────────┴──────────┘
        │
        │  one user
        │
        ▼
┌───────────────────────────────────┐
│           POSTS                   │
├────────────┬──────────┬───────────┤
│ PK         │          │ FK        │
│ post_id    │ title    │ user_id   │
├────────────┼──────────┼───────────┤
│ 201        │ Trip     │ 101       │
│ 202        │ Food     │ 101       │
│ 203        │ Travel   │ 102       │
└────────────┴──────────┴───────────┘
```

### 🧠 Visual Rule

```sql
User 101 ─────────▶ Post 201
          ├───────▶ Post 202
User 102 ─────────▶ Post 203
```

## Many to Many Relationship (N x N)

Many-to-Many means multiple records in one table are linked to multiple records in another table. This is usually implemented using a junction table.

```nginx
┌──────────────────────────────┐
│          STUDENTS            │
├────────────┬─────────────────┤
│ PK         │                 │
│ student_id │ name            │
├────────────┼─────────────────┤
│ 101        │ Rahul           │
│ 102        │ Aisha           │
└────────────┴─────────────────┘
        │            │
        │            │
        ▼            ▼
┌──────────────────────────────┐
│       ENROLLMENTS            │
├────────────┬─────────────────┤
│ FK         │ FK              │
│ student_id │ course_id       │
├────────────┼─────────────────┤
│ 101        │ 201             │
│ 101        │ 202             │
│ 102        │ 201             │
└────────────┴─────────────────┘
        ▲            ▲
        │            │
        │            │
┌────────────────────────────┐
│           COURSES          │
├────────────┬───────────────┤
│ PK         │               │
│ course_id  │ title         │
├────────────┼───────────────┤
│ 201        │ Math          │
│ 202        │ Physics       │
└────────────┴───────────────┘
```

### 🧠 Visual Rule

```sql
Student 101 ─────────▶ Course 201
            ├───────▶ Course 202
Student 102 ─────────▶ Course 201
```

It always needs a junction table to connect both sides.
