const fetch = require("node-fetch");
const utils = require("./utils");
const moment = require("moment");

const getCountries = async (req, res) => {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}countries?pretty&key=${process.env.API_KEY}`
    );
    const countries = await response.json();
    res.status(200).send(countries.countries);
  } catch (err) {
    res.status(500);
    res.send(err);
  }
};

const getLanguages = async (req, res) => {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}languages?pretty&key=${process.env.API_KEY}`
    );
    const languages = await response.json();
    res.status(200).send(languages.languages);
  } catch (err) {
    res.status(500);
    res.send(err);
  }
};

const getHolidays = async (req, res) => {
  const location = req.params.location;
  const language = req.params.language;
  const startDate = moment(req.params.startDate);
  const endDate = moment(req.params.endDate);
  const holidays = [];
  //loop from startDate year to endDate year and fetch holidays for each year
  if (endDate.diff(startDate, "years") <= 3) {
    try {
      for (let year = startDate.year(); year <= endDate.year(); year++) {
        const response = await fetch(
          `${process.env.BASE_URL}holidays?pretty&key=${process.env.API_KEY}&country=${location}&language=${language}&public&year=${year}`
        );
        const data = await response.json();
        holidays.push(...data.holidays);
        console.log(holidays);
      }
      res.status(200).send(holidays);
    } catch (err) {
      res.status(500);
      res.send(err.message);
    }
  }
};

const getCalendar = async (req, res) => {
  const { weekends, leaves, holidayDates, choices, startDate, endDate } =
    req.body;

  try {
    const pickedDays = utils.pickedDays(
      utils.setCalendarArray(
        weekends,
        holidayDates,
        choices,
        startDate,
        endDate
      ),
      leaves
    );
    const calendar = utils.highlightWeekends(pickedDays, weekends);
    const calendarOverview = utils.generateVacationPeriodString(calendar);
    const analytics = utils.generateAnalytics(calendar);
    const trips = utils.generateTrips(calendar);
    res.status(200).send({
      calendar: calendar,
      overview: calendarOverview,
      analytics: analytics,
      trips: trips,
    });
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

module.exports = { getCountries, getLanguages, getHolidays, getCalendar };
