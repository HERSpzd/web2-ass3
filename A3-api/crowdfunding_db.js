// Import db-details
var dbDetails = require("./db-details");

// Import required modules
var mysql = require('mysql2');
var bodyParser = require('body-parser');
var http = require('http');

/**
 * 
 * Create connection to database
 * 
 */
module.exports = {
  getconnection: ()=>{
  return mysql.createConnection({
    host:dbDetails.host,
    user:dbDetails.user,
    password:dbDetails.password,
    database:dbDetails.database 
    });
  }
}

