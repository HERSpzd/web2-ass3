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
 * route to serve search_fundraisers.html
 * 
 */
app.get("/search_fundraisers", (req, res) => {
  res.sendFile(path.join(__dirname, "search_fundraisers.html"));
});


/**
 * 
 * route to serve fundraisers.html
 * 
 */
app.get("/fundraisers", (req, res) => {
  res.sendFile(path.join(__dirname, "fundraisers.html"));
});

/**
 * 
 * route to serve fundraisers.html
 * 
 */
app.get("/donation", (req, res) => {
  res.sendFile(path.join(__dirname, "donation.html"));
});



/**
 * 
 * Start the server on port 8080
 * 
 */
app.listen(8080, () => {
  console.log("Running in 8080");
});