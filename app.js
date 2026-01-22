import { readFile, writeFile } from "fs/promises";
import { createServer } from "http";
import path from "path";
import crypto from "crypto";

const PORT = 3000;
const DATA_FILE = path.join("data", "links.json");

const serveFile = async (res, filePath, contentType) => {
  try {
    const data = await readFile(filePath);
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  } catch (error) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Page not found");
  }
};

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

const server = createServer(async (req, res) => {
  console.log("Request Error: ", req.url);

  // GET method
  if (req.method === "GET") {
    if (req.url === "/") {
      return serveFile(res, path.join("public", "index.html"), "text/html");
    } else if (req.url === "/style.css") {
      return serveFile(res, path.join("public", "style.css"), "text/css");
    } else if (req.url === "/bgimg.jpg") {
      return serveFile(res, path.join("public", "bgimg.jpg"), "image/jpeg");
    } else if (req.url === "/links") {
      const links = await loadLinks(); // It returns all the links in js object format

      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(links));
    } else {
      // Links Redirection logic

      const links = await loadLinks();
      const shortCode = req.url.slice(1);
      console.log("Incoming request:", req.method, req.url);

      if (links[shortCode]) {
        res.writeHead(302, { location: links[shortCode] });
        return res.end();
      }

      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Page not found");
    }
  }

  // POST method
  if (req.method === "POST" && req.url == "/shorten") {
    const links = await loadLinks(); // Load the existing data first

    let body = "";
    req.on("data", (chunk) => (body += chunk));

    req.on("end", async () => {
      console.log(body);

      // Recived String from the frontend converted to JS Object
      const { url, shortCode } = JSON.parse(body); // From the form we get 2 data that the url and shortform of that url

      if (!url) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        return res.end("URL is Rquired!");
      }

      //NOTE: If the short code is not provided by the user then create a shortcode first
      const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");

      //NOTE: Check the dulicate shortcode in the Data file
      if (links[finalShortCode]) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        return res.end(
          "This shortcode is already exist. Please Choose another shortcode!",
        );
      }

      //NOTE: If everything is fine then add it to the data file
      links[finalShortCode] = url;
      await saveLinks(links);

      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({ success: true, shortcode: finalShortCode }),
      );
    });
  }
});

server.listen(PORT, () => {
  console.log(`Server Running at http://localhost:${PORT}`);
});
