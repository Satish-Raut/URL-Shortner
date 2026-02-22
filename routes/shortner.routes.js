import { Router } from "express";

import {
  postURLShortner,
  getShortnedPage,
  redirectToShortlink,
  getStudentReport,
} from "../Controllers/postControllers.controller.js";

const router = Router(); // Instance of the router

// data handling codes are moved to model folder

// Tamplate Engine Demo
router.get("/report", getStudentReport);

// Express GET Method
router.get("/", getShortnedPage);

// URL Redirect Logic
router.get("/:shortCode", redirectToShortlink);

// Express POST Method -> {This part of the code Moved to controller folder}
router.post("/", postURLShortner);

// Default Export
// export default router;

// Named Export
export const shortnedRouter = router;
