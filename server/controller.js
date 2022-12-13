const fetch = require("node-fetch");

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
    console.log(err);
    res.status(500);
    res.send(err.message);
  }
};

module.exports = { getCountries, getHolidays };
