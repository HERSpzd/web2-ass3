// Import required modules
var express = require('express');
const cors = require("cors");  // Import cors
var bodyparser=require("body-parser");
var app = express();

// Enable cors
app.use(cors());

// Impoort api controller
var crowedfundingAPI = require("./controllerAPI/api-controller");

//Enable bodyparser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

// Define route path for crowdfundingAPI: /api/crowedfunding
app.use("/api/crowdfunding", crowedfundingAPI);

// Start the server on port 3060
app.listen(3060);
console.log("Server up and running on port 3060");