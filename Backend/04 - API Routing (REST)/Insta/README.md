# Upload File / Image

To upload we need to install a package called `multer`.

[Multer](https://www.npmjs.com/package/multer)

## 1.1 Install Multer

```bash
npm install multer
```

## 1.2 Require Multer

```javascript
// index.js
const multer = require("multer");
```

## 1.3 form enctype

In your HTML form, make sure to set the `enctype` attribute to `multipart/form-data` to allow file uploads.

```html
<form action="/upload" method="POST" enctype="multipart/form-data">
  <input type="file" name="image" />
  <button type="submit">Upload</button>
</form>
```

## 1.4 Configure Multer Storage

```javascript
// index.js

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/img");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
```

**NOTE:** Here, `cb` is a callback function, `null` is for error handling, `./public/img` is the destination folder for uploaded files, and `${Date.now()}-${file.originalname}` generates a unique filename by appending the current timestamp and the original file name.

## FINAL CODE

```javascript
// index.js
---
    ---

const multer = require("multer");

// To upload images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/img/uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// multer upload instance

const upload = multer({ storage });

app.post("/ig", upload.single("img"), (req, res) => {
  let { username, caption } = req.body;
  let imgPath;

  if (req.file) {
    imgPath = `/img/uploads/${req.file.filename}`;
  }
  let id = uuidv4();
  // add the new post at the start of the array
  posts.unshift({ id, username, caption, img });
  res.redirect("/ig");
});
```

**NOTE:** `if` condition is used to check if a file was uploaded. If a file is present, it constructs the image path using the filename provided by Multer and assigns it to `imgPath`. It's the safest way to handle file uploads.

---
