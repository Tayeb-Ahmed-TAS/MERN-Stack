# Sessions & Flash in Express

## What is State or Session?

**State** or **Session** is the interaction between the client and server.

```nginx

Client <--------------------> Server
          Request/Response
```

## Stateful Portocol

**Stateful Protocol** require server to save the status and session information.

> e.g. FTP

## Stateless Protocol

**Stateless Protocol** does not require the server to retain the server information or status.

> e.g. HTTP

---

## Express Sessions

An attempt to make our session stateful.

It stores data temporarily on the server side and associates it with a unique session ID. And this session ID is stored on the client side using cookies.

```nginx

                 SERVER
┌─────────────────────────────────────────┐
│ user1                                   │
│ sessionId: 101                          │
│ {                                       │
│   item: laptop                          │
│   item: charger                         │
│ }                                       │
│                                         │
│ user2                                   │
│ sessionId: 102                          │
│ {                                       │
│   item: shirt                           │
│   item: pants                           │
│ }                                       │
└─────────────────────────────────────────┘
            │                    │
            │                    │
            ▼                    ▼
      ┌───────────┐        ┌───────────┐
      │  CLIENT   │        │  CLIENT   │
      │ sessionId │        │ sessionId │
      │   101 🔴  │        │  102      │
      └───────────┘        └───────────┘

```

> On an e-commerce website like Amazon, users can add products to their cart without logging in.
> The server creates a session and assigns a unique sessionId, which is stored in the user’s browser, while cart data is stored on the server.
> As the user navigates between pages, the browser keeps sending the same sessionId, so the cart remains unchanged.
> After the user logs in, the session data can be linked to the user’s account and saved permanently.
> This allows the cart to persist across page changes and even future visits.

---

## Setting up Sessions in Express

[Express-session](https://www.npmjs.com/package/express-session)

### Install express-session package

```bash
npm i express-session
```

### Require

```javascript
const session = require("express-session");
```

> It is a middleware.

### Use

```javascript
app.use(
  session({
    secret: "yourSecretKey", // used to sign the session ID cookie
    resave: false, // forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: true, // forces a session that is "uninitialized" to be saved to the store
  })
);
```

> Here, **secret**, **resave**, and **saveUninitialized** are **options** for configuring the session middleware.
>
> Here, **secret** is used to sign the session ID cookie, ensuring its integrity and security.

## Express Session Options

[Documentation](https://www.npmjs.com/package/express-session#options)

## Compatible Session Stores

[Documentation](https://www.npmjs.com/package/express-session#compatible-session-stores)
