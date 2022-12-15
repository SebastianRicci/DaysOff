const fetch = require("node-fetch");
const utils = require("./utils");

const getCountries = async (req, res) => {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}countries?pretty&key=${process.env.API_KEY}`
    );
    const countries = await response.json();
    res.status(200).send(countries);
  } catch (err) {
    res.status(500);
    res.send(err);
  }
};

const getHolidays = async (req, res) => {
  const location = req.params.location;
  try {
    const response = await fetch(
      `${process.env.BASE_URL}holidays?pretty&key=${process.env.API_KEY}&country=${location}&year=2021`
    );
    const holidays = await response.json();
    res.status(200).send(holidays);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

const getPickedDays = async (req, res) => {
  const availableLeaves = req.params.leaves;
  const holidayDates = req.params.holidayDates.split(",");
  try {
    const pickedDays = utils.pickedDays(
      utils.setCalendarArray(holidayDates),
      availableLeaves
    );
    res.status(200).send(pickedDays);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

const getWeekends = async (req, res) => {
  const holidayDates = req.params.holidayDates.split(",");
  const availableLeaves = req.params.leaves;
  try {
    const pickedDays = utils.pickedDays(
      utils.setCalendarArray(holidayDates),
      availableLeaves
    );
    const weekends = utils.highlightWeekends(pickedDays);
    res.status(200).send(weekends);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

module.exports = { getCountries, getHolidays, getPickedDays, getWeekends };
