// Import crowdfunding_db module
var dbcon = require("../crowdfunding_db");
// Connect to the database
var connection = dbcon.getconnection();
connection.connect();
// Import the Express framework
var express = require('express');
// Create a new router
var router = express.Router();

/**
 * 
 * Get all active fundraisers from the database
 * 
 */
router.get("/fundraisers", (req, res) => {
  connection.query(
    "SELECT f.*, c.NAME AS CATEGORY_NAME " + 
    "FROM FUNDRAISER f " + 
    "JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID " + 
    "WHERE f.ACTIVE = true",
    (err, records, fields) => {
      if (err) {
        console.error("Error while retrieve the data");
      } else {
        res.send(records);
      }
    })
})

/**
 * 
 * Get categories from the database
 * 
 */
router.get("/category", (req, res) => {
  connection.query("SELECT * from CATEGORY", (err, records, fields) => {
    if (err) {
      console.error("Error while retrieve the data");
    } else {
      res.send(records);
    }
  })
})

/**
 * 
 * Get all active fundraisers including the category 
 * based on criteria from the database
 * 
 * @params ORGANIZER
 * @params CITY
 * @params CATEGORY_NAME
 * 
 */
router.get("/search", (req, res) => {
  // Search organizer
  if (!req.query.CITY && !req.query.CATEGORY_NAME) {
    var query = "SELECT f.*, c.NAME AS CATEGORY_NAME " + 
                "FROM FUNDRAISER f " + 
                "JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID " + 
                "WHERE f.ACTIVE = true " +  
                "AND f.ORGANIZER = ?";
    var parameters = [req.query.ORGANIZER];
    // Search city
  } else if (!req.query.ORGANIZER && !req.query.CATEGORY_NAME) {
    var query = "SELECT f.*, c.NAME AS CATEGORY_NAME " + 
                "FROM FUNDRAISER f " + 
                "JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID " + 
                "WHERE f.ACTIVE = true " + 
                "AND f.CITY = ?";
    var parameters = [req.query.CITY];

    // Search category
  } else if (!req.query.ORGANIZER && !req.query.CITY) {
    var query = "SELECT f.*, c.NAME AS CATEGORY_NAME " + 
                "FROM FUNDRAISER f " + 
                "JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID " + 
                "WHERE f.ACTIVE = true " +  
                "AND c.NAME = ?";
    var parameters = [req.query.CATEGORY_NAME];


    // Search organizer, city
  } else if (!req.query.CATEGORY_NAME) {
    var query = "SELECT f.*, c.NAME AS CATEGORY_NAME " + 
                "FROM FUNDRAISER f " + 
                "JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID " + 
                "WHERE f.ACTIVE = true " + 
                "AND f.ORGANIZER = ? " +  
                "AND f.CITY = ?";
    var parameters = [req.query.ORGANIZER, req.query.CITY];
    // Search organizer, category
  } else if (!req.query.CITY) {
    var query = "SELECT f.*, c.NAME AS CATEGORY_NAME " + 
                "FROM FUNDRAISER f " + 
                "JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID " + 
                "WHERE f.ACTIVE = true " +  
                "AND f.ORGANIZER = ? " +  
                "AND c.NAME = ?";
    var parameters = [req.query.ORGANIZER, req.query.CATEGORY_NAME];
    // Search city, category
  } else if (!req.query.ORGANIZER) {
    var query = "SELECT f.*, c.NAME AS CATEGORY_NAME " + 
                "FROM FUNDRAISER f " + 
                "JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID " + 
                "WHERE f.ACTIVE = true " + 
                "AND f.CITY = ? " +  
                "AND c.NAME = ?";
    var parameters = [req.query.CITY, req.query.CATEGORY_NAME];
    // Search organizer, city and category
  } else {

    var query = "SELECT f.*, c.NAME AS CATEGORY_NAME " + 
                "FROM FUNDRAISER f " + 
                "JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID " + 
                "WHERE f.ACTIVE = true " +  
                "AND f.ORGANIZER = ? " + 
                "AND f.CITY = ? " + 
                "AND c.NAME = ?";
    var parameters = [req.query.ORGANIZER, req.query.CITY, req.query.CATEGORY_NAME];
  }

  connection.query(query, parameters,
    (err, records, fields) => {
      if (err) {
        console.error("Error while retrieve the data");
      } else {
        res.json(records);
      }
    });
});

/**
 * 
 * Get the details of a fundraiser (by ID) 
 * from the database
 * 
 * @param FUNDRAISER_ID
 * 
 */
router.get("/fundraisers/:id", (req, res) => {
  connection.query("SELECT f.*, c.NAME AS CATEGORY_NAME " + 
                   "FROM FUNDRAISER f " + 
                   "JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID " + 
                   "WHERE f.ACTIVE = true " + 
                   "AND FUNDRAISER_ID = " + req.params.id,
  (err, records, fields) => {
      if (err) {
        console.error("Error while retrieve the data");
      } else {
        res.send(records);
      }
    })
})

module.exports = router;