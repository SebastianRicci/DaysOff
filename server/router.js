//Import necessary packages and module exports
const { Router } = require("express");
const router = Router();
const controller = require("./controller");

//Set router endpoints
router.get("/countries", controller.getCountries);
router.get("/holidays/:location", controller.getHolidays);

//Export router
module.exports = router;
