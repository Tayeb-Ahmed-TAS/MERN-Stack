# Authentication Basics

## Authentication vs Authorization

| **Authentication**                                                              | **Authorization**                                                                                          |
| ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Authentication is the process of verifying who someone is                       | Authorization is the process of verifying what specific applications, files, and data a user has access to |
| sign up / log in                                                                | Permissions / roles                                                                                        |
| Example: Username and Password                                                  | Example: Admin, Editor, User roles                                                                         |
| Only users who provide the correct username and password can access the account | Only that user can delete the review who created it                                                        |

---

# Storing Passwords Securely

We **_NEVER_** store the passwords as it is. We store their hashed form.

## Hashing

```nginx

+------------------------+     +------------------------+     +------------------------------+
|                        |     |                        |     |     how it is stored         |
|        password        | --> |   Hashing Function     | --> |                              |
|      "helloworld"      |     |                        |     |  936a185caaa266bb9cbe981e9   |
+------------------------+     +------------------------+     |  e05cb78cd732b0b3280eb9444   |
                                                              |  12bb6f8f8f07af              |
                                                              |                              |
                                                              +------------------------------+
```

### Characteristics of Hashing Functions

- For every input, there is a fixed output.

- They are one-way functions, we can't get input from output.

- For a different input, there ia a different output but of same length.

- Small changes in input should bring large changes in output.

- Well known hashing algorithms or functions are: MD5, SHA-256, bcrypt, CRC.

> One way function example is `modulus`.

```nginx
+----------------+     +----------------+     +----------------+
|                |     |                |     |                |
|    | x |       | --> |    x = -5      | --> |       5        |
|                |     |                |     |                |
+----------------+     +----------------+     +----------------+

+----------------+     +----------------+     +----------------+
|                |     |                |     |                |
|    | x |       | --> |    x = +5      | --> |      5         |
|                |     |                |     |                |
+----------------+     +----------------+     +----------------+

But getting back -5 or +5 from 5 is impossible.
```

## Salting

**_Password Salting_** is a technique to protect passwords stored in databases by adding a string of **32** or more characters and then **_hashing_** them.

```nginx
+------------------------+     +------------------------+     +-----------------------------+
|        password        |     |          salt          |     |    password + salt          |
|                        | --> |                        | --> |                             |
|      "helloworld"      |     |     "a9f3c1e7"         |     |  "helloworlda9f3c1e7"       |
+------------------------+     +------------------------+     +-----------------------------+
                                                                |
                                                                v
                                            +--------------------------------+
                                            |                                |
                                            |        Hashing Function        |
                                            |                                |
                                            +--------------------------------+
                                                              |
                                                              v
+--------------------------------+             +--------------------------------+
|        how it is stored        |             |        hashed output           |
|                                |             |                                |
|  936a185caaa266bb9cbe981e9     | <---------- |  936a185caaa266bb9cbe981e9     |
|  e05cb78cd732b0b3280eb9444     |             |  e05cb78cd732b0b3280eb9444     |
|  12bb6f8f8f07af                |             |  12bb6f8f8f07af                |
+--------------------------------+             +--------------------------------+

```

---

## Passport

**Passport** is **Express**-compatible authentication middleware for **Node.js**. Extremely flexible and modular, Passport can be unobtrusively dropped in to any **Express**-based web application. A comprehensive set of strategies support authentication using a **username and password**, **Facebook**, **Twitter**, and **more**.

[Passport npm package](https://www.npmjs.com/package/passport) | [Passport website](http://www.passportjs.org/) | [Passport documentation](http://www.passportjs.org/docs/)

[Passport strategies](https://www.passportjs.org/packages/)

### Installing Passport

```bash
npm install passport
```

## Strategies

| Sl  | **Strategy** | **Small Description** | **Install Command**              | **Link**                                                                                                                                           |
| --- | ------------ | --------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Local        | Username and Password | `npm i passport-local`           | [Passport Link](http://www.passportjs.org/packages/passport-local/) / [npm Link](https://www.npmjs.com/package/passport-local)                     |
| 2   | JWT          | JSON Web Token        | `npm i passport-jwt`             | [Passport Link](http://www.passportjs.org/packages/passport-jwt/) / [npm Link](https://www.npmjs.com/package/passport-jwt)                         |
| 3   | Google       | Google OAuth          | `npm i passport-google-oauth`    | [Passport Link](https://www.passportjs.org/packages/passport-google-oauth/) / [npm Link](https://www.npmjs.com/package/passport-google-oauth)      |
| 4   | Facebook     | Facebook OAuth        | `npm i passport-facebook`        | [Passport Link](http://www.passportjs.org/packages/passport-facebook/) / [npm Link](https://www.npmjs.com/package/passport-facebook)               |
| 5   | GitHub       | GitHub OAuth          | `npm i passport-github`          | [Passport Link](http://www.passportjs.org/packages/passport-github/) / [npm Link](https://www.npmjs.com/package/passport-github)                   |
| 6   | Twitter      | Twitter OAuth         | `npm i passport-twitter`         | [Passport Link](http://www.passportjs.org/packages/passport-twitter/) / [npm Link](https://www.npmjs.com/package/passport-twitter)                 |
| 7   | LinkedIn     | LinkedIn OAuth        | `npm i passport-linkedin-oauth2` | [Passport Link](http://www.passportjs.org/packages/passport-linkedin-oauth2/) / [npm Link](https://www.npmjs.com/package/passport-linkedin-oauth2) |
| 8   | Instagram    | Instagram OAuth       | `npm i passport-instagram`       | [Passport Link](http://www.passportjs.org/packages/passport-instagram/) / [npm Link](https://www.npmjs.com/package/passport-instagram)             |
| 9   | Microsoft    | Microsoft OAuth       | `npm i passport-microsoft`       | [Passport Link](http://www.passportjs.org/packages/passport-microsoft/) / [npm Link](https://www.npmjs.com/package/passport-microsoft)             |
| 10  | Apple        | Apple OAuth           | `npm i passport-apple`           | [Passport Link](http://www.passportjs.org/packages/passport-apple/) / [npm Link](https://www.npmjs.com/package/passport-apple)                     |

### Passport with mongoose

```bash
npm install passport-local-mongoose
```

[npm package](https://www.npmjs.com/package/passport-local-mongoose)

It is usefull in MongoDB database to simplify building username and password login with Passport.

### Passport Local Mongoose Instance Methods

[Documentation Link](https://www.npmjs.com/package/passport-local-mongoose#instance-methods)

| Sl  | **Method**       | **Small Description**                          |
| --- | ---------------- | ---------------------------------------------- |
| 1   | `setPassword`    | Sets the password for a user instance.         |
| 2   | `changePassword` | Changes the password for a user instance.      |
| 3   | `authenticate`   | Authenticates a user instance.                 |
| 4   | `resetAttempts`  | Resets the login attempts for a user instance. |

### Static Methods

[Documentation Link](https://www.npmjs.com/package/passport-local-mongoose#static-methods)

| Sl  | **Method**        | **Small Description**                                     |
| --- | ----------------- | --------------------------------------------------------- |
| 1   | `rauthenticate`   | Returns a function that is used to authenticate a user.   |
| 2   | `register`        | Registers a new user instance with a given password.      |
| 3   | `serializeUser`   | Used by Passport to serialize users into the              |
| 4   | `deserializeUser` | Used by Passport to deserialize users out of the session. |
| 5   | `findByUsername`  | Finds a user instance by username.                        |
| 6   | `createStrategy`  | Creates a Passport Local strategy based on the model.     |

### Plugin Usage

```javascript
---
    ---

const passportLocalMongoose = require('passport-local-mongoose');

---
    ---

schema_name.plugin(passportLocalMongoose);

    ---
---
```

### Configuring Strategy

> **Note:** Session is required to use Passport.

`passport.initialize()` and `passport.session()` middlewares are required to initialize Passport and to use persistent login sessions.

> `passport.initialize()` is a middleware that initializes Passport.
>
> Add these lines before defining any routes and after session middleware.

```javascript
app.use(passport.initialize());
app.use(passport.session());
```

> **Note:** `passport.session()` middleware: A web application needs the ability to identify users as they browse from page to page. This series of requests and responses, each associated with the same user, is known as a **session**. So that, users don't have to log in again and again on every request, every page, every resource access.

## Use passport-local

```javascript
const LocalStrategy = require("passport-local");

passport.use(new LocalStrategy(User.authenticate()));
```

> Here, `User.authenticate()` is a method added by passport-local-mongoose to User model and `User` is the mongoose model.

### We also need to use following 2 lines

```javascript
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
```

## To save user info

```javascript
app.get("/demouser", async (req, res) => {
  let fakeUser = new User({
    email: "example@demo.com",
    username: "demouser",
  });

  await User.register(fakeUser, "demopassword");
});
```

> Here, `User.register()` is a static method added by passport-local-mongoose to User model to register a new user instance with a given password. It takes two arguments, first is user instance and second is password in plain text. It hashes the password and stores the hashed password in the database.
>
> It automatically checks if the username already exists in the database. If it exists, it throws an error.

**Passport** uses **pdkdf2** hashing algorithm by default to hash passwords.

# Point to Remember

`hash` is the `password` after applying hashing function in Database.

Further is here [Part E](../../../Projects/AirBnb/README.md#part-e).
