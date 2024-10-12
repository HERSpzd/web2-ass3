// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");  // Import cors
const app = express();

// Enable cors
app.use(cors());

// to parse URL-encoded & JSON data 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// to serve static files
app.use(express.static(__dirname));

/**
 * 
 * route to serve index.html
 * 
 */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

/**
 * 
 * route to serve insert_fundraiser.html
 * 
 */
app.get("/insert_fundraiser", (req, res) => {
  res.sendFile(path.join(__dirname, "insert_fundraiser.html"));
});

/**
 * 
 * route to serve update_fundraiser.html
 * 
 */
app.get("/update_fundraiser", (req, res) => {
  res.sendFile(path.join(__dirname, "update_fundraiser.html"));
});

/**
 * 
 * Start the server on port 8081
 * 
 */
app.listen(8081, () => {
  console.log("Running in 8081");
});