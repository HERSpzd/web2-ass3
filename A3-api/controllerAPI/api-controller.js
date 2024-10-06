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
 * Updated get method
 * 
 * Get the details of a fundraiser (by ID) 
 * from the database
 * 
 * @param FUNDRAISER_ID
 * 
 */
router.get("/fundraisers/:id", (req, res) => {
  connection.query(`SELECT f.*, c.NAME AS CATEGORY_NAME, d.DONATION_ID, d.DATE, d.AMOUNT, d.GIVER
    FROM FUNDRAISER f
    JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID
    LEFT JOIN DONATION d ON f.FUNDRAISER_ID = d.FUNDRAISER_ID
    WHERE f.ACTIVE = true
    AND f.FUNDRAISER_ID = `  + req.params.id, (err, records, fields) => {
    if (err) {
      console.error("Error while retrieve the data");
    } else {
      res.send(records);
    }
  })
})


router.post("/donation", (req, res) => {
  var date = req.body.DATE;
  var amount = req.body.AMOUNT;
  var giver = req.body.GIVER;
  var fundraiserID = req.body.FUNDRAISER_ID;
  connection.query("INSERT INTO DONATION(DATE, AMOUNT, GIVER, FUNDRAISER_ID) VALUES('" + date + "'," + amount + ",'" + giver + "'," + fundraiserID + ")",
    (err, result) => {
      if (err) {
        console.error("Error while retrieve the data" + err);
      } else {
        res.send({ insert: "success" });
      }
    })
})

router.post("/insert_fundraiser", (req, res) => {
  var organizer = req.body.ORGANIZER;
  var caption = req.body.CAPTION;
  var targetFunding = req.body.TARGET_FUNDING;
  var currentFunding = req.body.CURRENT_FUNDING;
  var city = req.body.CITY;
  var active = req.body.ACTIVE;
  var categoryID = req.body.CATEGORY_ID;
  connection.query("INSERT INTO FUNDRAISER(ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, ACTIVE, CATEGORY_ID) VALUES " +
    "('" + organizer + "','" + caption + "'," + targetFunding + "," + currentFunding + ",'" + city + "'," + active + "," + categoryID + ")",
    (err, result) => {
      if (err) {
        console.error("Error while retrieve the data" + err);
      } else {
        res.send({ insert: "success" });
      }
    })
})

module.exports = router;