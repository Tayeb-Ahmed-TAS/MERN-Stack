# Node with SQL (Project)

## Roadmap of Routs

| HTTP Method | End Point   | Description                          | Route                  |
| ----------- | ----------- | ------------------------------------ | ---------------------- |
| **GET**     | `/`         | Show no. of users in DB              | **Index Route** (main) |
| **GET**     | `/user`     | Show all users (id, username, email) | **Show Route**         |
| **PATCH**   | `/user/:id` | Edit username                        | **Update Route**       |
| **POST**    | `/user`     | Create a new user                    | **Create Route**       |
| **DELETE**  | `/user/:id` | Delete a user                        | **Destroy Route**      |

## Edit Route (Edit username)

For that, we need to create 2 routes:

|     | Description                                                                       | HTTP Method | End Point        | Route            |
| --- | --------------------------------------------------------------------------------- | ----------- | ---------------- | ---------------- |
| 1   | To get form to edit the username, based on id. This form will require a password. | **GET**     | `/user/:id/edit` | **Edit Route**   |
| 2   | To edit username, if correct password was entered in the form.                    | **PATCH**   | `/user/:id`      | **Update Route** |

## Create Route (Create a new user)

For that, we need to create 2 routes:

|     | Description                           | HTTP Method | End Point   | Route              |
| --- | ------------------------------------- | ----------- | ----------- | ------------------ |
| 1   | To get form to create a new user.     | **GET**     | `/user/new` | **New User Route** |
| 2   | To create a new user in the database. | **POST**    | `/user`     | **Create Route**   |

## Destroy Route (Delete a user)

For that, we need to create 2 routes:

|     | Description                                 | HTTP Method | End Point          | Route             |
| --- | ------------------------------------------- | ----------- | ------------------ | ----------------- |
| 1   | To get form to match password for deletion. | **GET**     | `/user/:id/delete` | **Delete Route**  |
| 2   | To delete a user from the database.         | **DELETE**  | `/user/:id`        | **Destroy Route** |
