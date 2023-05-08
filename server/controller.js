const fetch = require("node-fetch");
const utils = require("./utils");

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
  try {
    const response = await fetch(
      `${process.env.BASE_URL}holidays?pretty&key=${process.env.API_KEY}&country=${location}&language=${language}&public&year=2022`
    );
    const data = await response.json();
    res.status(200).send(data.holidays);
  } catch (err) {
    res.status(500);
    res.send(err.message);
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
