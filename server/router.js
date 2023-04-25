//Import necessary packages and module exports
const { Router } = require("express");
const router = Router();
const controller = require("./controller");

//Set router endpoints
router.get("/countries", controller.getCountries);
router.get("/holidays/:location/:language", controller.getHolidays);
router.get(
  "/calendar/:weekends/:leaves/:holidayDates/:mandatoryDates/:desiredDates/:defaultDates",
  controller.getCalendar
);

//Export router
module.exports = router;
