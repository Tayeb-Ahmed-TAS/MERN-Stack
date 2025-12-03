# API

## 1.1 Introduction

API stands for _Application Programming Interface_. It is a set of rules and protocols for building and interacting with software applications. APIs define the methods and data formats that applications can use to communicate with each other, enabling different software systems to work together seamlessly.

## Common Types of APIs

1. **Web APIs**: These are APIs that can be accessed over the internet using HTTP/HTTPS protocols. Examples include RESTful APIs and SOAP APIs.

2. **Library APIs**: These are APIs provided by software libraries that allow developers to use predefined functions and methods in their applications.

3. **Operating System APIs**: These APIs allow applications to interact with the underlying operating system, such as file management, memory management, and process control.

4. **Database APIs**: These APIs enable applications to interact with database management systems for data retrieval, manipulation, and storage.

## Benefits of Using APIs

- **Modularity**: APIs allow developers to use existing functionalities without having to build them from scratch.

- **Interoperability**: APIs enable different software systems to communicate and work together.

- **Efficiency**: APIs can streamline development processes by providing ready-to-use components.

- **Scalability**: APIs can help applications scale by allowing them to integrate with other services and systems.

## JSON

JSON (JavaScript Object Notation) is a lightweight data interchange format that is easy for humans to read and write, and easy for machines to parse and generate. It is commonly used in web APIs to transmit data between a server and a client.

**_API responses often use JSON to structure the data being sent_**

For example, a typical JSON response from an API might look like this:

```json
{
  "string": "Hi",
  "number": 42,
  "boolean": true,
  "null": null,
  "object": { "name": "Alice", "age": 30 },
  "array": ["Hello", 26, false, null, { "key": "value", "number": 1998 }],
  "arrayOfObjects": [
    { "name": "Jerry", "age": 25 },
    { "name": "Tom", "age": 28 }
  ]
}
```

## Accessing Data from JSON

Data comes in the form of strings, numbers, booleans, null, objects, and arrays.

We've _2_ methods to access data from JSON:

1. JSON.parse() - Converts a JSON string into a JavaScript object.

```javascript
const jsonString = '{"name":"Alice","age":30}';
const jsonObject = JSON.parse(jsonString);

console.log(jsonObject.name); // Output: Alice

console.log(jsonObject); // Output: { name: 'Alice', age: 30 }

console.log(typeof jsonObject); // Output: object
```

2. JSON.stringify() - Converts a JavaScript object into a JSON string.

```javascript
const jsonObject = { name: "Alice", age: 30 };
const jsonString = JSON.stringify(jsonObject);

console.log(jsonString); // Output: '{"name":"Alice","age":30}'

console.log(typeof jsonString); // Output: string
```

## Testing API Requests

You can test API requests using various tools. Here are two popular options:

1. **Hoppscotch**: A desktop application for testing and debugging APIs.

2. **Postman**: A popular API testing tool that allows you to create and send HTTP requests, inspect responses, and automate testing.

## Ajax

Ajax stands for **`Asynchronous JavaScript and XML`**

It is the full process of sending and receiving data asynchronously without refreshing the web page.

### Steps in Ajax

1. Create an XMLHttpRequest object.

```javascript
const xhr = new XMLHttpRequest();
```

2. Configure it: Specify the HTTP method, URL, and whether the request should be asynchronous.

```javascript
xhr.open("GET", "https://api.example.com/data", true);
```

3. Send the request to the server.

```javascript
xhr.send();
```

4. Handle the response: Define a callback function to process the server's response when it arrives.

```javascript
xhr.onload = function () {
  if (xhr.status === 200) {
    const response = JSON.parse(xhr.responseText);
    console.log(response);
  } else {
    console.error("Error:", xhr.statusText);
  }
};
```

### Example of an Ajax Request

```javascript
const xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.example.com/data", true);
xhr.send();
xhr.onload = function () {
  if (xhr.status === 200) {
    const response = JSON.parse(xhr.responseText);
    console.log(response);
  } else {
    console.error("Error:", xhr.statusText);
  }
};
```

## HTTP Verbs

### GET

The GET method is used to retrieve data from a server at the specified resource. It is one of the most common HTTP methods and is typically used for fetching data without making any changes to the server's state.

### POST

The POST method is used to send data to a server to create or update a resource. It is commonly used when submitting form data or uploading files. Unlike GET requests, POST requests can include a body containing the data to be sent to the server.

### PUT

The PUT method is used to update an existing resource on the server or create a new resource if it does not exist. It is idempotent, meaning that multiple identical PUT requests will have the same effect as a single request.

### DELETE

The DELETE method is used to remove a specified resource from the server. It is typically used when you want to delete data, such as a record in a database or a file on the server.

### PATCH

The PATCH method is used to apply partial modifications to a resource on the server. Unlike PUT, which replaces the entire resource, PATCH allows you to update only specific fields or attributes of the resource.

### HEAD

The HEAD method is similar to the GET method, but it only retrieves the headers of a resource without the actual body content. It is often used to check if a resource exists or to obtain metadata about the resource, such as its size or last modified date.

### OPTIONS

The OPTIONS method is used to describe the communication options available for a specific resource on the server. It allows clients to determine which HTTP methods are supported by the server for that resource, as well as other capabilities such as allowed headers and content types.

### CONNECT

The CONNECT method is used to establish a tunnel to a server, typically for secure communication using SSL/TLS. It is commonly used in proxy servers to facilitate secure connections between clients and servers.

## Status Codes

HTTP status codes are three-digit numbers returned by a server in response to an HTTP request. They indicate the outcome of the request and provide information about the status of the requested resource. Status codes are grouped into five categories based on their first digit:

- **1xx** (Informational): These codes indicate that the request has been received and is being processed. Examples include 100 (Continue) and 101 (Switching Protocols).

- **2xx** (Successful): These codes indicate that the request was successfully received, understood, and accepted. Examples include 200 (OK), 201 (Created), and 204 (No Content).

- **3xx** (Redirection): These codes indicate that further action is needed to complete the request, often involving redirection to a different URL. Examples include 301 (Moved Permanently), 302 (Found), and 304 (Not Modified).

- **4xx** (Client Error): These codes indicate that there was an error with the request made by the client. Examples include 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), and 404 (Not Found).

- **5xx** (Server Error): These codes indicate that the server encountered an error while processing the request. Examples include 500 (Internal Server Error), 502 (Bad Gateway), and 503 (Service Unavailable).

Understanding HTTP status codes is essential for developers to diagnose issues with web applications and APIs, as they provide valuable insights into the success or failure of HTTP requests.

[MDN Web Docs: HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

### Example Status Codes

- **`200` (OK)**: The request was successful, and the server returned the requested data.

- **`201` (Created)**: The request was successful, and a new resource was created as a result.

- **`400` (Bad Request)**: The server could not understand the request due to invalid syntax.
- **`401` (Unauthorized)**: The client must authenticate itself to get the requested response.

- **`404` (Not Found)**: The server could not find the requested resource.

- **`500` (Internal Server Error)**: The server encountered an unexpected condition that prevented it from fulfilling the request.

## Add Information in URLs

We can add information in URLs using **Query Strings**

A query string is a part of a URL that contains data to be passed to web applications. It is typically used to send parameters and values to the server for processing.

### Structure of a Query String

A query string starts with a question mark (`?`) followed by key-value pairs separated by ampersands (`&`). Each key-value pair is separated by an equals sign (`=`).

It has 2 main components:

i. **Key**: The name of the parameter.

ii. **Value**: The value associated with the parameter.

### Example of a Query String

In the URL `https://google.com/search?q=Iron+Man`

- The query string is `?q=Iron+Man`

- The key is `q`

- The value is `Iron+Man`

### Multiple Parameters

Multiple parameters can be included in a query string by separating them with ampersands (`&`).

Example: `https://google.com/search?q=Iron+Man&lang=en&sort=latest`

- The query string is `?q=Iron+Man&lang=en&sort=latest`

- The keys are `q`, `lang`, and `sort`

- The values are `Iron+Man`, `en`, and `latest`

## HTTP Headers

It adds aditional information to HTTP requests and responses.

Headers consist of key-value pairs that provide metadata about the request or response.

### Common HTTP Request Headers

- **Content-Type**: Specifies the media type of the resource being sent (e.g., `application/json`, `text/html`).

- **Authorization**: Contains credentials for authenticating the client with the server

- **User-Agent**: Identifies the client software making the request (e.g., browser type and version).

- **Accept**: Indicates the media types that the client is willing to receive from the server.

### Common HTTP Response Headers

- **Content-Type**: Specifies the media type of the resource being returned (e.g., `application/json`, `text/html`).

- **Content-Length**: Indicates the size of the response body in bytes.

- **Set-Cookie**: Used to send cookies from the server to the client.

- **Cache-Control**: Specifies caching directives for the response (e.g., `no-cache`, `max-age=3600`).

### Example of HTTP Headers

```http
GET /api/data HTTP/1.1
Host: example.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3
Accept: application/json
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 123
{
  "name": "Alice",
  "age": 30
}
```

---

## 1.2 Fetch API

### Introduction

The Fetch API is a modern JavaScript interface that allows you to make network requests similar to XMLHttpRequest (XHR). It provides a more powerful and flexible way to interact with resources over the network, such as fetching data from APIs or submitting data to a server. The Fetch API uses Promises, making it easier to work with asynchronous operations and handle responses.

### Basic Syntax

- `fetch(url)` keyword is used to make a request to the specified URL.

The basic syntax of the Fetch API is as follows:

```javascript
fetch(url, options)
  .then((response) => {
    // Handle the response
  })
  .catch((error) => {
    // Handle any errors
  });
```

- `url`: The URL of the resource you want to fetch.

- `options` (optional): An object containing any custom settings that you want to apply to the request. This can include method, headers, body, mode, credentials, cache, redirect, referrer, and more.
