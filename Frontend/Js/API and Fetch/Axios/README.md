# Axios

**Axios** is a library to make HTTP requests from both the browser and Node.js. It is promise-based and provides a simple and clean API for making asynchronous requests.

It is a better alternative to the native `fetch` API, offering features like request and response interceptors, automatic JSON data transformation, and support for older browsers.

[Axios on GitHub](https://github.com/axios/axios)

[Axios Documentation](https://axios-http.com/docs/intro)

## Installation

You can install Axios using npm or yarn:

```bash
npm install axios
```

or,

```bash
yarn add axios
```

## CDN

You can also include Axios directly in your HTML using a CDN without any installation:

- Using jsDelivr CDN (ES5 UMD browser module):

```html
<script src="https://cdn.jsdelivr.net/npm/axios@1.6.7/dist/axios.min.js"></script>
```

- Using unpkg CDN:

```html
<script src="https://unpkg.com/axios@1.6.7/dist/axios.min.js"></script>
```

This will make Axios available globally as `axios`.

## Example Usage

Here is a simple example of making a GET request using Axios:

```html
<!DOCTYPE html>
<html lang="en">
<head></head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Axios Example</title>
    <link rel="stylesheet" href="styles.css">
    </head>
<body>
    <h1>Cat Facts</h1>

    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.7/dist/axios.min.js"></script>
    <script src="app.js"></script>
</body>
</html>
```

```javascript
let url = "https://catfact.ninja/fact";

async function getFacts() {
  try {
    let res = await axios.get(url);
    console.log(res);
    console.log(res.data.fact);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

getFacts();
```

```Output
{
  data: { fact: "Cats have five toes on their front paws, but only four toes on their back paws.", length: 74 },
  status: 200,
  statusText: 'OK',
  headers: { ... },
  config: { ... },
  request: { ... }
}

Cats have five toes on their front paws, but only four toes on their back paws.
```

**_If we use Axios we don't need to convert the response to JSON manually as Axios does it automatically._**

## Sending Headers using Axios

You can send custom headers with your requests using the `headers` option in the request configuration:

```html
<!DOCTYPE html>
<html lang="en">
<head></head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Axios Example with Headers</title>
    <link rel="stylesheet" href="styles.css">
    </head>
<body>
    <h1>Dad Jokes</h1>

    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.7/dist/axios.min.js"></script>
    <script src="app.js"></script>
</body>
</html>
```

```javascript
let url = "https://icanhazdadjoke.com/";

const config = { headers: { Accept: "application/json" } };

async function getJoke() {
  try {
    let res = await axios.get(url, config);
    console.log(res);
    console.log(res.data.joke);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

getJoke();
```

```Output
{
  data: { id: "R7UfaahVfFd", joke: "Why did the cookie cry? Because his mother was a wafer so long!", status: 200 },
  status: 200,
  statusText: 'OK',
  headers: { ... },
  config: { ... },
  request: { ... }
}

Why did the cookie cry? Because his mother was a wafer so long!
```

## Using Query Strings

```JavaScript
let url = "http://universities.hipolabs.com/search?country="

let country = "nepal";

async function getUniversities(){
  try{
    let res = await axios.get(url + country);
    console.log(res.data);
  }catch(err){
    console.log(err);
  }
}

getUniversities();

```

### Using Params Object

We can also use the `params` object to send query parameters:

```JavaScript
let url = "http://universities.hipolabs.com/search";

let country_name = "nepal";

let config = {
  params: {
    country: country_name,
  },
};

async function getUniversities(){
  try{
    let res = await axios.get(url, config);
    console.log(res.data);
  }catch(err){
    console.log(err);
  }
}

getUniversities();

```
