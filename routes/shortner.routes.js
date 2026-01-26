
import { readFile, writeFile } from "fs/promises";
import crypto from "crypto";
import path from "path";
import { Router } from "express";

const router = Router() // Instance of the router

const DATA_FILE = path.join("data", "links.json");

const loadLinks = async () => {
  try {
    const data = await readFile(DATA_FILE, "utf-8"); // Read all the data from the particular file path
    return JSON.parse(data); // Return that JSON data in JS Object format
  } catch (error) {
    console.error(error);
    if (error.code === "ENOENT") // If there is no any data file available
    {
      await writeFile(DATA_FILE, JSON.stringify({})); // Create the data file with an empty object
      return {};
    }
    throw error;
  }
};

const saveLinks = async (links) => {
  await writeFile(DATA_FILE, JSON.stringify(links, null, 2));
};

// Express GET Method
router.get("/", async (req, res) => {
  try {
    const file = await readFile(path.join("views", "index.html"));
    const links = await loadLinks(); // It returns all the links in js object format

    // console.log("Loaded Links:\n", links, typeof links);

    // Update the front-end
    const content = file.toString().replaceAll(
      "{{shortened-urls}}",
      Object.entries(links)
        .map(([shortCode, url]) => {
          return `
                  <a href="/${shortCode}" target="_blank"> 
                  ${req.host}/${shortCode}</a> - ${url}
              `;
        })
        .join(""),
    );

    return res.send(content);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error!");
  }
});

// URL Redirect Logic

router.get("/:shortCode", async (req, res) => {
  try {
    const { shortCode } = req.params;
    console.log(req.params)
    const links = await loadLinks();

    if (!links[shortCode]) return res.status(404).send("404 Error Occured!");

    return res.redirect(links[shortCode]);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error!");
  }
});

// Express POST Method
router.post("/", async (req, res) => {
  try {
    const links = await loadLinks(); // Load the existing data first
    const { url, shortCode } = req.body;

    if (!url) {
      return res.send("URL is Rquired!");
    }

    //NOTE: If the short code is not provided by the user then create a shortcode first
    const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");

    //NOTE: Check the dulicate shortcode in the Data file
    if (links[finalShortCode]) {
      return res
        .status(400)
        .send(
          "This shortcode is already exist. Please Choose another shortcode!",
        );
    }

    //NOTE: If everything is fine then add it to the data file
    links[finalShortCode] = url;
    await saveLinks(links);

    return res.redirect("/")
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error!");
  }
});

// Default Export
// export default router;

// Named Export
export const shortnedRouter = router;