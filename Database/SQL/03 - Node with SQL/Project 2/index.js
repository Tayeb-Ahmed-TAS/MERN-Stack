const express = require("express");
const mysql = require("mysql2");
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require("uuid");

const app = express();
const port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "delta_app",
  password: "tayebshamim0000",
});

app.get("/", (req, res) => {
  let q = `SELECT count(*) FROM user2`;
  try {
    connection.query(q, (err, result) => {
      let user = result[0]["count(*)"];
      res.render("home.ejs", { user });
    });
  } catch (err) {
    console.log(err);
    res.send("Some error in DB");
  }
});

app.get("/user", (req, res) => {
  let q = `SELECT * FROM user2`;
  try {
    connection.query(q, (err, users) => {
      if (err) throw err;
      res.render("allusers.ejs", { users });
    });
  } catch (err) {
    console.log(err);
    res.send("Some error in DB");
  }
});

app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user2 WHERE id = '${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("edit.ejs", { user });
    });
  } catch (err) {
    console.log(err);
    res.send("Some error in DB");
  }
});

app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let { username: newUsername, password: form_password } = req.body;
  let q1 = `SELECT * FROM user2 WHERE id = '${id}'`;

  try {
    connection.query(q1, (err, result) => {
      if (err) throw err;
      let user = result[0];
      if (form_password !== user.password) {
        res.send("Incorrect Password!");
      } else {
        let q2 = `UPDATE user2 SET username = '${newUsername}' WHERE id = '${id}'`;
        connection.query(q2, (err, result) => {
          if (err) throw err;
          res.redirect("/user");
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.send("Some error in DB");
  }
});

app.get("/user/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/user", (req, res) => {
  let id = uuidv4();
  let { username, email, password, confirm_password } = req.body;
  let q1 = `SELECT email FROM user2 WHERE email = '${email}'`;

  try {
    connection.query(q1, (err, result) => {
      if (err) throw err;
      let existingEmail = result[0];
      if (existingEmail) {
        res.send("This email is already registered !");
      } else {
        let q2 = `INSERT INTO user2 (id, username, email, password) VALUES ('${id}', '${username}', '${email}','${password}')`;
        if (password !== confirm_password) {
          res.send("Passwords doesn't match !");
        } else {
          connection.query(q2, (err, result) => {
            if (err) throw err;
            res.redirect("/user");
          });
        }
      }
    });
  } catch (err) {
    console.log(err);
    res.send("Some error in DB");
  }
});

app.get("/user/:id/delete", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user2 WHERE id = '${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("delete.ejs", { user });
    });
  } catch (err) {
    console.log(err);
    res.send("Some error in DB");
  }
});

app.delete("/user/:id", (req, res) => {
  let { id } = req.params;
  let { password: form_password } = req.body;
  let q1 = `SELECT password FROM user2 WHERE id = '${id}'`;

  try {
    connection.query(q1, (err, result) => {
      if (err) throw err;
      let user = result[0];
      if (form_password !== user.password) {
        res.send("Incorrect Password!");
      } else {
        let q2 = `DELETE FROM user2 WHERE id = '${id}'`;
        connection.query(q2, (err, result) => {
          if (err) throw err;
          res.redirect("/user");
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.send("Some error in DB");
  }
});

app.listen(port, (req, res) => {
  console.log(`Server is running on http://localhost:${port}`);
});
