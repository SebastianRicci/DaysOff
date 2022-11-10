export const HolidayAPI = {
  url: process.env.REACT_APP_BASE_URL,
  key: process.env.REACT_APP_API_KEY,

  getCountries: async function () {
    try {
      const countries = await fetch(
        `${this.url}countries?pretty&key=${this.key}`
      );
      const countriesArray = await countries.json();
      return countriesArray;
    } catch (err) {
      console.warn("Error in getCountries: ", err);
    }
  },

  getHolidays: async function (location) {
    try {
      const holidays = await fetch(
        `${this.url}holidays?pretty&key=${this.key}&country=${location}&year=2021`
      );
      const holidaysArray = await holidays.json();
      return holidaysArray;
    } catch (err) {
      console.warn("Error in getHolidays: ", err);
    }
  },
};
