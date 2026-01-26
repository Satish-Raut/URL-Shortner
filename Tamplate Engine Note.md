
# Tamplate Engine in ExpressJS

- A **template engine** allows developers to generate **dynamic HTML pages** by combining **HTML templates** with **backend data**.

- `Instead of sending static HTML files, the server injects data into templates and sends the final HTML to the browser.`

## Why Do We Need a Template Engine?

<!-- {Without a template engine:} -->

- HTML is static
- Dynamic data cannot be easily injected
- Mixing HTML and JS using `res.send()` becomes messy

<!-- {With a template engine:} -->

- HTML becomes dynamic
- Clean separation of logic and presentation
- Better scalability and maintainability

## How Template Engine Works Internally

 1. Client sends request
 2. Express route calls res.render()
 3. Template engine:
        - Reads template file
        - Injects data
        - Generates final HTML
 4. Express sends HTML response.

# Steps to use Tamplate Engine in code

## Step 1: Configure Express

 ```js
    app.set("view engine", "ejs");
    app.set("views", "views");
```

## Step 2: Create Template (views/home.ejs)

```html
    <!DOCTYPE html>
    <html>
        <body>
            <h1>Hello <%= name %></h1>
        </body>
    </html>
```

## Step 3: Render Template

```js
    app.get("/", (req, res) => {
        res.render("home", { name: "Satish" });
    });

```

# EJS Syntax – Outputting Values (Notes)

---

## 1. Escaped Output (`<%= ... %>`)

### Description

- Used to print **dynamic content safely**.
- Automatically **escapes special HTML characters**.
- Prevents **HTML injection / XSS attacks**.
- This is the **default and recommended** way to display data.

### Example

#### EJS

```ejs
    <h1><%= title %></h1>

```express 
    res.render("index", { title: "<Welcome>" });

```Output
    <h1>&lt;Welcome&gt;</h1>
```

## 2. Unescaped Output (`<%- ... %>`)

### Description

- Prints **raw HTML without escaping**.
- Allows **HTML tags to be rendered in the browser**.
- **⚠️ Dangerous if data is not sanitized**.
- **Can lead to XSS vulnerabilities.**

### Example

#### EJS

```ejs
    <h1><%- title %></h1>

```express 
    res.render("index", { content: "<strong>Bold Text</strong>" });

```Output
    <div><strong>Bold Text</strong></div>
```


## <%- include('header') %> in EJS

- In EJS (Embedded JavaScript),
<%- include('header') %> is used to include and render another EJS file (partial) inside the current template.

### What it does

- Loads the file header.ejs
- Injects its HTML content at that exact location
- Treats it like a reusable component
- This helps in avoiding code duplication and makes templates modular and maintainable.