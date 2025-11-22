# Express

## Library

A **library** is a collection of pre-written code that can be used to perform specific tasks.

Eg - **axios**

## Framework

A **framework** is a set of pre-written code that provides a structure for building applications.

Eg - **Express**

---

## What is Express?

A **Node.js** web application framework that helps us to make web applications.

It is used for **server side** programming.

### Uses of Express

1. Listen for incoming request.

2. Parse the request.

3. Match response with routes.

4. Send the suitable response.

---

## Installing Express

### Step -1

First create or initialize `package.json` file inside the folder where you want to create your project.

```bash
npm init
```

### Step -2

Now install express using the following command:

```bash
npm install express
```

---

## Port

**Ports** are the logical endpoints of a network connection that is used to exchange information between a web server and a web client.

### Common Ports

| Sl  | Port Number | Service        |
| --- | ----------- | -------------- |
| 01  | 443         | HTTPS          |
| 02  | 80          | HTTP           |
| 03  | 21          | FTP            |
| 04  | 22          | SSH            |
| 05  | 25          | SMTP           |
| 06  | 3306        | MySQL Database |
| 07  | 5432        | PostgreSQL DB  |
| 08  | 6379        | Redis          |
| 09  | 27017       | MongoDB        |
| 10  | 3000        | Development    |
| 11  | 8080        | Alternate HTTP |
| 12  | 5000        | Development    |
| 13  | 8000        | Development    |
| 14  | 4200        | Angular Dev    |
| 15  | 5500        | Live Server    |

---

## Creating a Simple Express Server

Create a file named `app.js` and add the following code:

```javascript
import express from "express";

const app = express();

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

### Now run the server using the following command

```bash
node app.js
```

You should see the message: `Server is running on http://localhost:3000`

Open your browser and navigate to `http://localhost:3000` to see your server in action.

### Close the server

Press `Ctrl + C` in the terminal where the server is running.

---
