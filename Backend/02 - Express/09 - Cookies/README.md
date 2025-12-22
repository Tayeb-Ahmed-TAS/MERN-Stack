# Cookies

## Web Cookies

**HTTP** cookies are small blocks of data created by a web server while a user is browsing a website and placed on the user's computer or other device by the user's web browser.

[HTTP cookie - Wikipedia](https://en.wikipedia.org/wiki/HTTP_cookie)

> Cookies are stored in `Name=Value` pairs, separated by semicolons.

## Example of cookies

- After enabling dark mode on a website, the preference is saved in a cookie so that the other pages on the website can load in dark mode as well.

- When logging into a website, a session cookie is created to keep the user logged in as they navigate through different pages of the site.

- An e-commerce website uses cookies to remember the items added to a user's shopping cart as they continue to browse the site.

## How to Send **Cookies** in Express

`res.cookie()` function is used to set cookies in Express.

```javascript
app.get("/getcookies", (req, res) => {
  res.cookie("greet", "Hello");
  res.cookie("madeIn", "Bangladesh");
  res.send("Sent you some cookies!");
});
```

---

## **Cookie** Parser

[req.cookies - Express](https://expressjs.com/en/4x/api.html#req.cookies)

To read cookies sent by the client, we can use the `cookie-parser` middleware. It is basically a npm package.

[cookie-parser - npm](https://www.npmjs.com/package/cookie-parser)

### Install cookie-parser

```bash
npm install cookie-parser
```

### Require cookie-parser

```javascript
const cookieParser = require("cookie-parser");
```

### Use cookie-parser

```javascript
app.use(cookieParser());
```

### Access cookies

```javascript
app.get("/", (req, res) => {
  console.dir(req.cookies);
  console.dir(req.cookies.name); // name is from 'name=value' pair
  res.send("Welcome to the Home Page!");
});
```

---

## Signed Cookies

Signed cookies are cookies that have been cryptographically signed to ensure their integrity and authenticity. This means that the server can verify that the cookie has not been tampered with by the client.

So that the server can trust the data stored in the cookie. No one can modify the cookie value from the console of the browser.

There're **two** steps to use signed cookies in Express:

1. Send Signed Cookie

2. Verify Signed Cookie

[res.cookie() - Express](https://expressjs.com/en/4x/api.html#res.cookie)

### 1. Send Signed Cookie

`signed: true` option is used to send signed cookies.

> `Note:` To use signed cookies, you need to provide a secret key to the `cookie-parser` middleware.

```javascript
app.use(cookieParser("your_secret_key")); // secret key is required for signed cookies

app.get("/getsignedcookie", (req, res) => {
  res.cookie("username", "tayeb", { signed: true });
  res.send("Sent you a signed cookie!");
});
```

### 2. Verify Signed Cookie

`req.signedCookies` property is used to access signed cookies.

```javascript
app.get("/verify", (req, res) => {
  res.send(req.signedCookies);
});
```
