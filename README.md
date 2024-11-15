# Flexible Proxy Server

A Node.js proxy server built with Express that listens for all types of HTTP requests and forwards them to specified target URLs. It handles request bodies, headers, and CORS issues, making it easier to interact with APIs that have CORS restrictions or require request forwarding.

## Features

- Supports all HTTP methods (GET, POST, PUT, DELETE, etc.).
- Forwards requests and their bodies to any specified target.
- Handles JSON and URL-encoded request bodies.
- Modifies response headers to enable CORS.
- Configurable to allow only specific target domains for security.
- Dockerized for easy deployment, including on Raspberry Pi devices.

## Prerequisites

- **Node.js and npm** installed on your machine.
- **Docker** installed (if deploying with Docker).
- Basic knowledge of Node.js and Docker.

## Installation

### Clone the Repository

bash

Copy code

`git clone https://github.com/yourusername/your-repo-name.git cd your-repo-name`

### Install Dependencies

bash

Copy code

`npm install`

### Run the Server

bash

Copy code

`node index.js`

The server will start on port `4242` by default.

## Usage

### Specifying the Target URL

You can specify the target URL in two ways:

1. **Query Parameter**:

   - Add a `target` query parameter to your request URL.
   - Example: `http://localhost:3000/?target=https://api.example.com`

2. **Custom Header**:

   - Include an `X-Target-URL` header in your request.
   - Example: `X-Target-URL: https://api.example.com`

### Making Requests from Your Frontend

**GET Request Example**:

```js
fetch(
  "http://localhost:3000/?target=" +
    encodeURIComponent("https://favqs.com/api/qotd"),
)
  .then((response) => response.json())
  .then((data) => {
    console.log("Response:", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

``

**POST Request Example**:

```js
fetch(
  "http://localhost:4242/?target=" +
    encodeURIComponent("https://api.example.com/data"),
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key: "value" }),
  },
)
  .then((response) => response.json())
  .then((data) => {
    console.log("Response:", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

## Configuration

### Environment Variables

You can configure the server using environment variables:

- `PORT`: The port on which the server will listen (default is `4242`).


Update the `router` function to check against the allowed hosts:

```js
router: (req) => {
  const target = req.query.target || req.headers["x-target-url"];
  if (!target || !isAllowedHost(target)) {
    throw new Error("Target URL is not allowed");
  }
  return target;
};
```

## Docker Deployment

### Build the Docker Image

`docker build -t node-proxy .`

### Run the Docker Container

`docker run -d -p 4242:4242 --name node-proxy-container node-proxy`

### Running on Raspberry Pi

The provided `Dockerfile` uses an ARM-compatible base image suitable for Raspberry Pi devices.
