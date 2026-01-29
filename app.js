import express from "express";
import {shortnedRouter} from "./routes/shortner.routes.js";
import { PORT } from "./config/env.js";

// const PORT = 3000;

// "<------------------- ExpressJS -------------------->"

// Create server usign ExpressJs
const app = express();

app.use(express.static("public")); // Public folder contains only the css and the background image file as static file
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs")

/* NOTE:  
`express.urlencoded({ extended: true }) is middleware that parses URL-encoded form data sent by the browser and converts it into a JavaScript object available on req.body, with support for nested objects when extended is set to true.`
*/

// Express Router
// app.use(router)
app.use(shortnedRouter)

app.listen(PORT, () => {
  console.log(`Server Running at http://localhost:${PORT}`);
});
