# 📘 HTTP GET vs POST — Short Notes (Node.js Focus)

---

## 🔹 GET Method

- `GET is an HTTP method used to request (fetch) data from the server **without modifying server state**.`

### 📌 Key Characteristics

- Used to **retrieve resources**
- **No request body**
- Data (if any) is sent via **URL / query parameters**
- **Safe** (does not change server data)
- **Idempotent** (same request gives same result)
- **Cacheable**
- Data is **visible in the URL**

### 📌 Common Uses

- Loading HTML pages
- Fetching CSS, JS, images
- Reading data from the server

### 📌 Browser Behavior

- Browser sends GET requests **automatically**
- Each resource (HTML, CSS, image) triggers a **separate GET request**

### 📌 Node.js Handling

req.method === "GET"
req.url === "/path"

## 📌 What is the effect of res.end() in Node.js?

- `res.end() ends the HTTP response, sends the final data to the client, and tells Node.js that no more data will be sent for this request.`

🔹 Why res.end() is Mandatory
`❌ If you DON’T call res.end():`

- Browser keeps waiting forever
- Request stays open
- Server memory is blocked
- Client appears “loading…”

`✔ If you call res.end():`

- Browser receives response
- Page loads correctly
- Server frees resources

## POST Method

- `POST is an HTTP method used to send data to the server to create or process a resource.`

## ENOENT stands for “Error NO ENTry”

- `ENOENT is an operating system–level error that indicates a requested file or directory does not exist. Node.js exposes this error when file system operations fail due to missing paths.`

- `Frontend connects to backend using HTTP requests (GET/POST), and backend responds using HTTP responses.`

## 🧠 Why `response.json()` Works

Internally:

- Reads response body stream
- Collects chunks
- Converts to string
- Runs JSON.parse() for you
- Returns a JS object

## What is Object.entries()?

- `Object.entries() returns an array of key–value pairs from an object.`
