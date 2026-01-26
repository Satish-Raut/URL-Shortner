import crypto from "crypto";
import { loadLinks, saveLinks } from "../models/shortner.model.js";

export const getShortnedPage = async (req, res) => {
  try {
    // const file = await readFile(path.join("views", "index.html"));
    const links = await loadLinks(); // It returns all the links in js object format

    // console.log("Loaded Links:\n", links, typeof links);

    // Update the front-end -> {This Code part is converted in to EJS}
    res.render("index", { links, host: req.host });

    // return res.send(content);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error!");
  }
};

export const getStudentReport = async (req, res) => {
  const student = [
    {
      name: "Satish Raut",
      Institute: "LPU",
      Specialization: "Data Scienec",
    },
    {
      name: "Alok Pradhan",
      Institute: "SBHS",
      Specialization: "MIL",
    },
    {
      name: "Kartikeswara Sahu",
      Institute: "SMIT",
      Specialization: "WebDev",
    },
    {
      name: "Prasad Palei",
      Institute: "Centurian",
      Specialization: "AI/ML",
    },
    {
      name: "Bablu",
      Institute: "SOA",
      Specialization: "Fullstack",
    },
  ];

  res.render("report", { student });
};

export const redirectToShortlink = async (req, res) => {
  try {
    const { shortCode } = req.params;
    console.log(req.params);
    const links = await loadLinks();

    if (!links[shortCode]) return res.status(404).send("404 Error Occured!");

    return res.redirect(links[shortCode]);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error!");
  }
};

export const postURLShortner = async (req, res) => {
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

    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error!");
  }
};
