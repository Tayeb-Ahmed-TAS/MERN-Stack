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
| 3   | Google       | Google OAuth          | `npm i passport-google-oauth20`  | [Passport Link](http://www.passportjs.org/packages/passport-google-oauth20/) / [npm Link](https://www.npmjs.com/package/passport-google-oauth20)   |
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
