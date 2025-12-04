const express = require("express");
const mysql = require("mysql2");
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "delta_app",
  password: "tayebshamim0000",
});

// Index Route -> Fetch & Show Number of users

app.get("/", (req, res) => {
  let q = `SELECT count(*) FROM user`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let count = result[0]["count(*)"];
      res.render("home.ejs", { count });
    });
  } catch (err) {
    console.log(err);
    res.send("Some Error in DB");
  }
});

// Show Route -> Show all users (id, username, email)

app.get("/user", (req, res) => {
  let q = `SELECT id, username, email FROM user`;

  try {
    connection.query(q, (err, users) => {
      if (err) throw err;
      res.render("showusers.ejs", { users });
    });
  } catch (err) {
    console.log(err);
    res.send("Some Error in DB");
  }
});

// Edit Route -> Edit username by id

app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id = '${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("edit.ejs", { user });
    });
  } catch (err) {
    console.log(err);
    res.send("Some Error in DB");
  }
});

// Update Route -> Update username by id

app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id = '${id}'`;
  let { password: form_password, username: newUsername } = req.body;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      if (form_password != user.password) {
        // If password does not match
        res.send("Incorrect Password!");
      } else {
        // If password matches then update the username
        let q2 = `UPDATE user SET username = '${newUsername}' WHERE id = '${id}'`;

        connection.query(q2, (err, result) => {
          if (err) throw err;
          res.redirect("/user");
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.send("Some Error in DB");
  }
});

// New User Route -> Create a new user

app.get("/user/new", (req, res) => {
  res.render("new.ejs");
});

// Create User Route -> Create a new user

app.post("/user", (req, res) => {
  let { username, email, password, confirm_password } = req.body;
  let id = uuidv4();
  let q = `INSERT INTO user (id, username, email, password) VALUES ('${id}', '${username}', '${email}', '${password}')`;

  if (password !== confirm_password) {
    res.send("Passwords doesn't match!");
  } else {
    try {
      connection.query(q, (err, result) => {
        console.log("User Added !");
        res.redirect("/user");
      });
    } catch (err) {
      console.log(err);
      res.send("Some Error in DB");
    }
  }
});

// Delete Route -> To get form to match password

app.get("/user/:id/delete", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id = '${id}'`;

  try {
    connection.query(q, (err, result) => {
      let user = result[0];
      res.render("delete.ejs", { user });
    });
  } catch (err) {
    console.log(err);
    res.send("Some Error in DB");
  }
});

// Destroy Route -> To delete user if password matches

app.delete("/user/:id", (req, res) => {
  let { id } = req.params;
  let { password: form_password } = req.body;
  let q1 = `SELECT password FROM user WHERE id = '${id}'`;

  try {
    connection.query(q1, (err, result) => {
      if (err) throw err;
      let user = result[0];
      if (form_password != user.password) {
        // If password does not match
        res.send("Incorrect Password!");
      } else {
        // If password matches then delete the user
        let q2 = `DELETE FROM user WHERE id = '${id}'`;

        connection.query(q2, (err, result) => {
          if (err) throw err;

          res.redirect("/user");
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.send("Some Error in DB");
  }
});

app.listen(8080, (req, res) => {
  console.log("Server is running on http://localhost:8080");
});
