
# Separating Routes in Separate Modules (Express.js)

<!-- 'What is a Route?' -->
- `A route defines how your server responds to a specific HTTP request (URL + method).`

<!-- 'What is a Router?' -->
- `A router is a container used to group related routes together.`

## Express Router

- A **router in Express.js** is a tool used to define **modular and reusable routes** in an application.
- It helps organize the application by grouping **related routes together**.
- Routers improve **code readability, maintainability, and scalability**.

## Creating a Router

- A router is created using:

```js
const router = express.Router()
```

-> `Routes inside a router can be defined using methods such as:`

- router.get()
- router.post()
- router.put()
- router.delete()

-> `The router is connected to the main Express application using:`

```js
app.use("/basepath", router);
```
<!-- -> "All routes defined in the router will be prefixed with the given base path." -->

## Benefits of Using Routers

- `Cleaner project structure`
- `Reusable route logic`
- `Easier debugging and testing`
- `Industry-standard Express.js practice`
