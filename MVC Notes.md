# Model View Controller (MVC)

- MVC is a software design pattern that separates an application into three distinct layers: **Model**, **View**, and **Controller**, each with a specific responsibility.
- It improves **code maintainability, scalability, and separation of concerns**.

---

## Model: Manages Data and Logic

- Represents the data of the application.
- Handles business logic and validations.
- Interacts with the database (e.g., CRUD operations).
- Independent of the user interface.

**Examples:**

- Database schemas
- ORM models (e.g., Mongoose models)
- Business rules

---

## View: Handles User Interface

- Displays data to the user.
- Responsible for rendering the presentation using **HTML, CSS, and JavaScript**.
- Receives data only from the Controller.
- Contains minimal logic (mostly display-related).

**Examples:**

- EJS templates
- HTML pages
- UI components

---

## Controller: The Mediator

- Acts as an intermediary between the Model and the View.
- Handles user input and HTTP requests.
- Calls the Model to fetch or update data.
- Sends processed data to the View for rendering.

**Examples:**

- Express route handlers
- Controller functions

---

## MVC Request Flow

1. User sends a request (e.g., clicks a button).
2. Controller receives the request.
3. Controller interacts with the Model.
4. Model processes data and returns the result.
5. Controller passes data to the View.
6. View renders the response to the user.

---

## Advantages of MVC

- Clear separation of concerns
- Easier debugging and testing
- Improved code reusability
- Scalable for large applications
- Supports parallel development (frontend & backend teams)

---

## Disadvantages of MVC

- More complex for small applications
- Increased initial setup time
- Learning curve for beginners

---

## MVC in Express.js (Example)

- **Model:** Mongoose schema
- **View:** EJS templates
- **Controller:** Express route handlers

```js
// Controller example
app.get("/students", (req, res) => {
    const students = Student.find();
    res.render("students", { students });
});
