const moment = require("moment");

module.exports = {
  setCalendarArray: function (
    weekends,
    holidayDates,
    choices,
    startDate,
    endDate
  ) {
    const mandatoryDates = choices
      .filter((choice) => choice.choice === "mandatory")
      .map((choice) => moment(choice.date).format("YYYY-MM-DD"));

    const desiredDates = choices
      .filter((choice) => choice.choice === "vacation")
      .map((choice) => moment(choice.date).format("YYYY-MM-DD"));

    const publicHolidayDates = choices
      .filter((choice) => choice.choice === "publicHoliday")
      .map((choice) => moment(choice.date).format("YYYY-MM-DD"));

    const defaultDates = choices
      .filter((choice) => choice.choice === "default")
      .map((choice) => moment(choice.date).format("YYYY-MM-DD"));

    //Set Initial array with dates and value as 0
    let start = new Date(startDate);
    const end = new Date(endDate);
    let calendar = [];
    while (start <= end) {
      calendar.push({
        date: moment(start).format("YYYY-MM-DD"),
        value: 0,
        algo: 0,
        holiday: false,
        mandatory: false,
        vacation: false,
      });
      start = new Date(start.setDate(start.getDate() + 1));
    }

    //Set holidays to be true and their value equal to 1
    for (let i = 0; i < calendar.length; i++) {
      if (
        holidayDates.includes(calendar[i].date) ||
        publicHolidayDates.includes(calendar[i].date)
      ) {
        calendar[i].holiday = true;
        calendar[i].value = 1;
      } else {
        calendar[i].holiday = false;
      }
      //Set Weekend values to 1
      if (weekends.includes(moment(calendar[i].date).day().toString())) {
        calendar[i].value = 1;
      }
      //Set desired vacation dates to be true and their value equal to 1
      if (desiredDates.includes(calendar[i].date)) {
        calendar[i].vacation = true;
        calendar[i].value = 1;
        calendar[i].algo = 1;
      }

      //Set mandatory work dates to be true and their value equal to 1
      if (mandatoryDates.includes(calendar[i].date)) {
        calendar[i].mandatory = true;
      }

      //Override dates and set to default value
      if (defaultDates.includes(calendar[i].date)) {
        calendar[i].value = 0;
      }
    }
    return calendar;
  },

  pickedDays: function (calendar, vacationDays) {
    //Subtract desired vacation days from total pto available
    vacationDays -= calendar.filter((day) => day.vacation == true).length;

    //Handle case where vacationDays is larger than available days to pick from, thus returning a completely picked calendar.
    if (
      vacationDays >
      calendar.filter(
        (day) =>
          day.value == 0 &&
          day.algo == 0 &&
          day.holiday == false &&
          day.mandatory == false &&
          day.vacation == false
      ).length
    ) {
      for (let i = 0; i < calendar.length; i++) {
        if (
          calendar[i].value == 0 &&
          calendar[i].algo == 0 &&
          calendar[i].holiday == false &&
          calendar[i].mandatory == false &&
          calendar[i].vacation == false
        ) {
          calendar[i].value = 1;
          calendar[i].algo = 1;
        }
      }
      return calendar;
    }

    let bridge = 1;
    while (vacationDays > 0) {
      let streak = 0;
      for (let i = 0; i < calendar.length - 1; i++) {
        if (calendar[i].value == 0 && calendar[i].mandatory == false) {
          streak++;
          if (
            streak == bridge &&
            calendar[i + 1].value != 0 &&
            vacationDays > 0
          ) {
            for (let j = 0; j < bridge; j++) {
              if (vacationDays > 0 && calendar[i - j].mandatory == false) {
                calendar[i - j].value = 1;
                calendar[i - j].algo = 1;
                vacationDays--;
              }
            }
          }
        } else {
          streak = 0;
        }
      }
      bridge++;
    }
    return calendar;
  },

  // Function to find ranges of adjacent 1 elements with a length of 3 or more
  findRanges: function (calendar) {
    const ranges = [];
    let start = null;
    for (let i = 0; i < calendar.length; i++) {
      const currentValue = calendar[i].value;
      if (currentValue === 1) {
        if (start === null) {
          start = i;
        } else if (i === calendar.length - 1) {
          const end = i;
          if (end - start >= 2) {
            ranges.push({ start: start, end: end });
          }
        }
      } else {
        if (start !== null) {
          const end = i - 1;
          if (end - start >= 2) {
            ranges.push({ start, end });
          }
          start = null;
        }
      }
    }
    return ranges;
  },

  highlightWeekends: function (calendar) {
    // Call the findRanges function on the calendar array
    const ranges = this.findRanges(calendar);

    // Loop through each range and check holiday and algo properties
    ranges.forEach((range) => {
      for (let i = range.start; i <= range.end; i++) {
        const currentObj = calendar[i];
        if (currentObj.holiday === false && currentObj.algo === 0) {
          currentObj.algoWeekend = 1;
        }
      }
    });
    return calendar;
  },

  // Function to generate vacation period string for each range
  generateVacationPeriodString: function (calendar) {
    const ranges = this.findRanges(calendar);
    const vacationPeriodStrings = [];
    ranges.forEach((range, index) => {
      let pto = 0;
      let ptoDates = [];
      for (let i = range.start; i <= range.end; i++) {
        const currentObj = calendar[i];
        if (currentObj.algo === 1) {
          pto++;
          ptoDates.push(currentObj.date);
        }
      }
      const rangeLength = range.end - range.start + 1;
      if (pto === 0) {
        vacationPeriodStrings.push(
          `Vacation period ${
            index + 1
          }:\nEnjoy a long weekend of ${rangeLength} days without taking any days off (${moment(
            calendar[range.start].date
          ).format("dddd, MMMM Do YYYY")} to  ${moment(
            calendar[range.end].date
          ).format("dddd, MMMM Do YYYY")}).`
        );
      } else if (pto === 1) {
        vacationPeriodStrings.push(
          `Vacation period ${index + 1}:\nTake ${pto} day off (${ptoDates.map(
            (date) => {
              return moment(date).format("Do MMM");
            }
          )}) and enjoy a long weekend of ${rangeLength} days (${moment(
            calendar[range.start].date
          ).format("dddd, MMMM Do YYYY")} to  ${moment(
            calendar[range.end].date
          ).format("dddd, MMMM Do YYYY")}).`
        );
      } else {
        vacationPeriodStrings.push(
          `Vacation period ${index + 1}:\nTake ${pto} days off (${ptoDates.map(
            (date) => {
              return moment(date).format("Do MMM");
            }
          )}) and enjoy a vacation of ${rangeLength} days (${moment(
            calendar[range.start].date
          ).format("dddd, MMMM Do YYYY")} to  ${moment(
            calendar[range.end].date
          ).format("dddd, MMMM Do YYYY")}).`
        );
      }
    });
    return vacationPeriodStrings;
  },

  generateAnalytics: function (calendar) {
    let result = {};

    for (let i = 0; i < calendar.length; i++) {
      const date = moment(calendar[i].date);
      const year = date.format("YYYY");
      const month = date.format("MMMM");
      const isHoliday = calendar[i].holiday;
      const isWeekend = calendar[i].value == 1 && calendar[i].holiday == false;
      const isWorkingDay = calendar[i].value == 0;
      const isPickedDay = calendar[i].algo == 1;

      if (!result[year]) {
        result[year] = {};
      }

      if (!result[year][month]) {
        result[year][month] = {
          holidays: 0,
          workingDays: 0,
          weekends: 0,
          pickedDays: 0,
        };
      }

      if (isHoliday) {
        result[year][month].holidays++;
      } else if (isPickedDay) {
        result[year][month].pickedDays++;
      } else if (isWorkingDay) {
        result[year][month].workingDays++;
      } else if (isWeekend) {
        result[year][month].weekends++;
      }
    }

    const years = Object.keys(result);

    const yearMonths = years.reduce((acc, year) => {
      const months = Object.keys(result[year]);
      const yearMonths = months.map((month) => `${year} - ${month}`);
      return acc.concat(yearMonths);
    }, []);

    const pickedDays = yearMonths.map((yearMonth) => {
      const [year, month] = yearMonth.split(" - ");
      return result[year][month].pickedDays;
    });

    const totalPickedDays = pickedDays.reduce((acc, pickedDay) => {
      return acc + pickedDay;
    }, 0);

    const vacationEarned = this.findRanges(calendar).reduce((acc, range) => {
      return acc + range.end - range.start + 1;
    }, 0);

    return {
      result,
      vacationEarned,
      totalPickedDays,
    };
  },

  generateTrips: async function (calendar) {
    //OpenAI API Trip Recommendations
    // const OpenAI = require("openai");
    // const { Configuration, OpenAIApi } = OpenAI;
    // const configuration = new Configuration({
    //   organization: process.env.OPENAI_ORG,
    //   apiKey: process.env.OPENAI_API_KEY,
    // });
    // const openai = new OpenAIApi(configuration);
    //Build request object
    // const ranges = this.findRanges(calendar);
    // const request = {
    //   Loc: "es-md",
    //   Budg: "3000$",
    //   Trips: ranges.length,
    // };

    //     const response = await openai.createCompletion({
    //       model: "text-davinci-003",
    //       prompt: `As a travel recommendation AI, I receive json objects with location and budget fields based on the user's current location, trip duration and budget for all trips. Here are two sample requests and responses:
    //       Request: {Loc: es-md, Budg: 3000$, Trips: 3}
    //       Response: [{Loc: "Ibiza",Price:"100$",Desc: "Ibiza is a beautiful Spanish island with stunning beaches, lively nightlife, rich history and culture."}, {Loc: "Amalfi Coast", Price: "1600$",Desc:"The Amalfi Coast is a picturesque region along the southern coast of Italy, famous for its dramatic cliffs and charming seaside towns."}, {Loc:"San Sebastian", Price: "400$", Desc:"San Sebastian is a stunning coastal city in northern Spain, known for its beautiful beaches, rich culture, and delicious cuisine."}]

    //       Request: ${request}
    //       Response:
    // `,
    //       max_tokens: 500,
    //       temperature: 0,
    //     });
    //     const tripRecommendations = response.data.choices[0].text;

    const ranges = this.findRanges(calendar);
    const tripRecommendations = [
      {
        Location: "Ibiza, Spain",
        Price: "600$",
        Description: `Ibiza is a beautiful Spanish island located in the Mediterranean Sea, known for its stunning beaches, lively nightlife, and beautiful landscapes. The island is a popular destination for party-goers, with many world-renowned nightclubs and DJ performances. In addition to its nightlife, Ibiza also offers a rich history and culture, with ancient ruins and museums to explore, as well as delicious local cuisine to indulge in.`,
        img: "https://images.unsplash.com/photo-1563784462386-044fd95e9852?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
      },
      {
        Location: "Amalfi Coast, Italy",
        Price: "1600$",
        Description: `The Amalfi Coast is a picturesque region along the southern coast of Italy, famous for its dramatic cliffs, sparkling turquoise waters, and charming seaside towns. Visitors to the Amalfi Coast can explore the beautiful villages of Positano, Amalfi, and Ravello, all nestled into the steep cliffs overlooking the sea. The region is also known for its delicious seafood and locally produced limoncello, as well as for its hiking trails and scenic drives that offer breathtaking views of the coastline.`,
        img: "https://images.unsplash.com/photo-1612698093158-e07ac200d44e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      },
      {
        Location: "San Sebastian, Spain",
        Price: "400$",
        Description: `San Sebastian, located in the Basque Country of northern Spain, is a stunning coastal city known for its beautiful beaches, rich culture, and delicious cuisine. The city is famous for its "pintxos", a type of Basque tapas that are served in bars and restaurants throughout the city. Visitors can also explore the historic Old Town, which features beautiful architecture and narrow, winding streets, or relax on the city's stunning beaches, such as La Concha and Zurriola. San Sebastian also hosts a number of festivals throughout the year, including the San Sebastian International Film Festival and the Tamborrada drumming festival.`,
        img: "https://images.unsplash.com/photo-1553455010-bdb488ac12e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
      },
      {
        Location: "Budapest, Hungary",
        Price: "500$",
        Description: `Budapest, the capital of Hungary, is a beautiful city located on the banks of the Danube River. Visitors to Budapest can explore the historic Buda Castle, soak in one of the city's many thermal baths, or stroll along the picturesque Andrássy Avenue. The city is also known for its vibrant nightlife and delicious local cuisine, including dishes like goulash and chimney cakes.`,
        img: "https://images.unsplash.com/photo-1565426873118-a17ed65d74b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1752&q=80",
      },
      {
        Location: "Krakow, Poland",
        Price: "300$",
        Description: `Krakow, located in southern Poland, is a charming city with a rich history and culture. Visitors can explore the historic Old Town, including the beautiful Wawel Castle and Main Market Square. The city is also home to many museums and galleries, including the Wieliczka Salt Mine and the Schindler's Factory Museum. Krakow is known for its traditional Polish cuisine, including dishes like pierogi and kielbasa.`,
        img: "https://images.unsplash.com/photo-1605645163392-f845d2a4a869?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      },
      {
        Location: "Bali, Indonesia",
        Price: "1200$",
        Description: `Bali is a stunning Indonesian island known for its beautiful beaches, lush green rice terraces, and vibrant culture. Visitors to Bali can explore ancient temples and historic landmarks, such as the Ubud Palace and the Tirta Empul water temple. The island is also home to many world-class resorts and spas, as well as delicious local cuisine like nasi goreng and satay.`,
        img: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      },
      {
        Location: "Marrakech, Morocco",
        Price: "800$",
        Description: `Marrakech, located in Morocco, is a vibrant city known for its colorful souks, historic landmarks, and delicious cuisine. Visitors can explore the historic Medina, including the beautiful Bahia Palace and Koutoubia Mosque, or relax in one of the city's many hammams. Marrakech is also known for its local cuisine, which includes dishes like tagine and couscous.`,
        img: "https://images.unsplash.com/photo-1618423205267-e95744f57edf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1746&q=80",
      },
      {
        Location: "Tokyo, Japan",
        Price: "2500$",
        Description: `Tokyo, the capital of Japan, is a bustling metropolis with a unique blend of modern and traditional culture. Visitors to Tokyo can explore historic landmarks like the Senso-ji Temple and Tokyo Imperial Palace, or immerse themselves in the city's vibrant pop culture scene in areas like Shibuya and Harajuku. Tokyo is also known for its world-class cuisine, including sushi, ramen, and tempura.`,
        img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1788&q=80",
      },
      {
        Location: "Krabi, Thailand",
        Price: "500$",
        Description: `Krabi is a beautiful province in southern Thailand, known for its stunning limestone cliffs, crystal-clear waters, and pristine beaches. Visitors to Krabi can enjoy a wide range of outdoor activities, including rock climbing, kayaking, and scuba diving. The province also features several beautiful national parks, such as Khao Phanom Bencha National Park and Than Bok Khorani National Park, which are home to a variety of flora and fauna.`,
        img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1678&q=80x",
      },
      {
        Location: "Cape Town, South Africa",
        Price: "1200$",
        Description: `Cape Town is a coastal city in South Africa, known for its stunning natural beauty, rich cultural heritage, and diverse wildlife. Visitors to Cape Town can explore the city's many historic landmarks, such as Table Mountain and Robben Island, or relax on one of the city's many beautiful beaches, such as Clifton Beach or Camps Bay. The city is also home to a variety of wildlife, including penguins, seals, and sharks, which can be seen on tours and excursions around the city.`,
        img: "https://images.unsplash.com/photo-1581596326248-f55ac7852760?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80",
      },
      {
        Location: "Reykjavik, Iceland",
        Price: "1500$",
        Description: `Reykjavik is the capital city of Iceland and is known for its stunning natural beauty, vibrant cultural scene, and unique geothermal features. Visitors to Reykjavik can explore the city's many museums and galleries, such as the National Museum of Iceland and the Reykjavik Art Museum, or take a dip in one of the city's many thermal pools, such as the famous Blue Lagoon. The city is also a popular base for exploring Iceland's many natural wonders, such as the Northern Lights, glaciers, and geysers.`,
        img: "https://images.unsplash.com/photo-1474690870753-1b92efa1f2d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      },
      {
        Location: "Cancun, Mexico",
        Price: "$700",
        Description: `Cancun is a popular beach destination located on the Caribbean coast of Mexico, known for its crystal-clear waters, white sandy beaches, and lively nightlife. Visitors to Cancun can relax on the beach, explore the ancient Mayan ruins of Chichen Itza, or take a boat trip to the nearby island of Isla Mujeres. The city is also famous for its nightlife, with many bars and nightclubs to choose from.`,
        img: "https://images.unsplash.com/photo-1580846629083-02669741360a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1654&q=80",
      },
      {
        Location: "Phuket, Thailand",
        Price: "$600",
        Description: `Phuket is a beautiful island located in Thailand, known for its stunning beaches, crystal-clear waters, and vibrant nightlife. Visitors to Phuket can relax on the beach, take a boat trip to nearby islands, or explore the old town of Phuket. The island is also famous for its cuisine, with many delicious Thai dishes to try.`,
        img: "https://images.unsplash.com/photo-1587691254941-bbd1faa13154?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      },
      {
        Location: "Rio de Janeiro, Brazil",
        Price: "$1000",
        Description: `Rio de Janeiro is a vibrant city located in Brazil, known for its beautiful beaches, lively music and dance, and colorful culture. Visitors to Rio can relax on the beaches of Copacabana and Ipanema, hike up to the iconic Christ the Redeemer statue, or dance the night away at a samba club. The city is also famous for its food, with many delicious Brazilian dishes to try.`,
        img: "https://images.unsplash.com/photo-1619546952812-520e98064a52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80",
      },
      {
        Location: "Amsterdam, Netherlands",
        Price: "$800",
        Description: `Amsterdam is a beautiful city located in the Netherlands, known for its picturesque canals, beautiful architecture, and vibrant culture. Visitors to Amsterdam can explore the many museums and galleries, bike along the canals, or visit the famous coffee shops and bars.`,
        img: "https://images.unsplash.com/photo-1553105797-feac2b692dc5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      },
      {
        Location: "Athens, Greece",
        Price: "$1200",
        Description: `Athens is the capital of Greece and a city steeped in history and culture. Visitors can explore the ancient ruins of the Acropolis and other historical landmarks, as well as enjoy the lively nightlife and delicious cuisine.`,
        img: "https://plus.unsplash.com/premium_photo-1661963720399-b0d05bee9005?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      },
      {
        Location: "Machu Picchu, Peru",
        Price: "$1500",
        Description: `Machu Picchu is a famous Incan archaeological site located high in the Andes Mountains of Peru. Visitors can hike the Inca Trail to reach the site and explore the ruins of this ancient civilization, as well as enjoy the stunning natural beauty of the surrounding area.`,
        img: "https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80",
      },
      {
        Location: "Sapa, Vietnam",
        Price: "$800",
        Description: `Sapa is a small town in the northwest of Vietnam, known for its beautiful rice terraces, stunning mountain landscapes, and colorful hill tribes. Visitors can trek through the hills, visit local markets, and immerse themselves in the unique culture of the region.`,
        img: "https://images.unsplash.com/photo-1516484681091-7d83961805f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2556&q=80",
      },
      {
        Location: "Petra, Jordan",
        Price: "$1200",
        Description: `Petra is an ancient city carved into the rock in the desert of Jordan, known for its stunning architecture and rich history. Visitors can explore the city's many temples, tombs, and buildings, including the famous Treasury and Monastery.`,
        img: "https://images.unsplash.com/photo-1615811648503-479d06197ff3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1752&q=80",
      },
      {
        Location: "Edinburgh, Scotland",
        Price: "$1500",
        Description: `Edinburgh is a historic city in Scotland, known for its stunning architecture, rich history, and vibrant cultural scene. Visitors can explore the city's many museums and galleries, visit historic landmarks like Edinburgh Castle, or experience the city's famous festivals, such as the Edinburgh Fringe Festival.`,
        img: "https://images.unsplash.com/photo-1567802942109-0a5d92ed35b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1622&q=80",
      },
      {
        Location: "Zhangjiajie, China",
        Price: "$900",
        Description: `Zhangjiajie is a region in China known for its stunning natural landscapes, including towering sandstone pillars, deep gorges, and lush forests. Visitors can hike through the region's many trails, take a cable car to the top of the peaks, or explore the unique culture of the local Tujia people.`,
        img: "https://images.unsplash.com/photo-1567266565446-d9c40ccf59a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      },
      {
        Location: "Cinque Terre, Italy",
        Price: "$1500",
        Description: `Cinque Terre is a picturesque region along the coast of Italy, known for its colorful villages, stunning views, and delicious seafood. Visitors can hike along the coast, explore the charming towns of Vernazza and Riomaggiore, or relax on one of the region's many beautiful beaches.`,
        img: "https://images.unsplash.com/photo-1538504841477-7c399f1f0dc3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80",
      },
      {
        Location: "Siem Reap, Cambodia",
        Price: "$300",
        Description:
          "Siem Reap is a city in Cambodia, famous for the stunning Angkor Wat temple complex. Visitors can explore the ancient temples and ruins, learn about the history of the Khmer Empire, and experience the vibrant culture of Cambodia. The city is also home to a lively nightlife and delicious local cuisine.",
        img: "https://plus.unsplash.com/premium_photo-1661963188432-5de8a11f21a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      },
      {
        Location: "Kyoto, Japan",
        Price: "$4000",
        Description:
          "Kyoto is a city in Japan, famous for its traditional culture and stunning temples and gardens. Visitors can explore the historic district of Gion, visit the Fushimi Inari Shrine, and immerse themselves in the culture of Japan. The city is also home to world-renowned restaurants and luxurious accommodations.",
        img: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      },
      {
        Location: "Cartagena, Colombia",
        Price: "$700",
        Description:
          "Cartagena is a beautiful city on the Caribbean coast of Colombia, known for its colonial architecture, vibrant culture, and stunning beaches. Visitors can explore the old city, relax on the beach, and indulge in the delicious local cuisine. The city also has a lively nightlife and is a popular destination for music festivals.",
        img: "https://images.unsplash.com/photo-1666977461267-c0e924696510?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1688&q=80",
      },
      {
        Location: "Banff National Park, Canada",
        Price: "$3500",
        Description:
          "Banff National Park is a stunning natural wonderland in Canada, known for its breathtaking scenery and outdoor activities. Visitors can explore the stunning lakes and mountains, hike through the wilderness, and experience the beauty of the Canadian Rockies. The park is also home to luxurious lodges and world-class restaurants.",
        img: "https://images.unsplash.com/photo-1558818061-547b1114aa6a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      },
      {
        Location: "Santorini, Greece",
        Price: "$2000",
        Description:
          "Santorini is a beautiful Greek island, known for its whitewashed buildings, stunning sunsets, and crystal-clear waters. Visitors can explore the charming villages of Oia and Fira, relax on the beaches, and indulge in the delicious local cuisine.",
        img: "https://plus.unsplash.com/premium_photo-1661963643348-e95c6387ee8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      },
      {
        Location: "Sienna, Italy",
        Price: "$800",
        Description:
          "Sienna is a city in Tuscany, Italy, famous for its beautiful medieval architecture and stunning countryside. Visitors can explore the historic city center, visit the Cathedral of Santa Maria Assunta, and enjoy the delicious local cuisine and wine.",
        img: "https://images.unsplash.com/photo-1638002533177-364be2f53c4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      },
      {
        Location: "Dubrovnik, Croatia",
        Price: "$900",
        Description:
          "Dubrovnik is a beautiful city on the Adriatic coast of Croatia, known for its stunning old town and beautiful beaches. Visitors can explore the ancient walls and fortifications of the old city, relax on the beach, and indulge in the delicious local cuisine.",
        img: "https://images.unsplash.com/photo-1414862625453-d87604a607e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2532&q=80",
      },
      {
        Location: "Queenstown, New Zealand",
        Price: "$4000",
        Description:
          "Queenstown is a beautiful town on the South Island of New Zealand, known for its stunning natural scenery and outdoor activities. Visitors can explore the surrounding mountains and lakes, go hiking or skiing, and experience the unique culture of the local Maori people.",
        img: "https://images.unsplash.com/photo-1557589747-a830b99db298?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1325&q=80",
      },
      {
        Location: "Oaxaca, Mexico",
        Price: "$300",
        Description:
          "Oaxaca is a charming city in southern Mexico known for its vibrant culture and rich history. Visitors can explore the beautiful colonial architecture, such as the Santo Domingo Church and the Macedonio Alcala Theater, or visit the fascinating Museum of Oaxacan Cultures. Oaxaca is also famous for its delicious cuisine, including dishes like mole and tlayudas.",
        img: "https://images.unsplash.com/photo-1578170222009-c7893aa20afd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      },
      {
        Location: "Siargao Island, Philippines",
        Price: "$500",
        Description:
          "Siargao Island is a beautiful tropical paradise in the Philippines, known for its stunning beaches, crystal-clear waters, and world-class surfing. Visitors can explore the island's many beaches, such as Cloud 9 and Magpupungko Beach, or go island-hopping to nearby islands. Siargao Island also offers a laid-back atmosphere and delicious local cuisine.",
        img: "https://images.unsplash.com/photo-1565565978731-f9e8cd35a317?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1375&q=80",
      },
      {
        Location: "Ljubljana, Slovenia",
        Price: "$400",
        Description:
          "Ljubljana is a charming city in Slovenia known for its beautiful architecture, vibrant culture, and scenic riverfront. Visitors can explore the historic Ljubljana Castle, stroll through the beautiful Tivoli Park, or visit the fascinating National Museum of Slovenia. Ljubljana is also known for its delicious cuisine, such as traditional Slovenian dumplings and stews.",
        img: "https://images.unsplash.com/photo-1602619025915-073b0594d662?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
      },
      {
        Location: "Havana, Cuba",
        Price: "$600",
        Description:
          "Havana is the capital city of Cuba, known for its vibrant culture, beautiful architecture, and lively nightlife. Visitors can explore the historic Old Havana, visit the stunning El Capitolio building, or relax on the beautiful beaches. Havana is also known for its delicious Cuban cuisine, such as classic dishes like ropa vieja and lechon asado.",
        img: "https://images.unsplash.com/photo-1520995749626-73103c69a7d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      },
      {
        Location: "Porto, Portugal",
        Price: "$500",
        Description:
          "Porto is a beautiful city in northern Portugal known for its stunning riverfront, historic architecture, and delicious wine. Visitors can explore the historic Ribeira district, visit the beautiful Palacio da Bolsa, or take a wine tasting tour of the famous Port wine cellars. Porto is also known for its delicious cuisine, such as grilled sardines and bacalhau (salt cod).",
        img: "https://images.unsplash.com/photo-1569959595862-1c84553361c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2554&q=80",
      },
      {
        Location: "Hoi An, Vietnam",
        Price: "$400",
        Description:
          "Hoi An is a charming city in central Vietnam known for its historic architecture, beautiful beaches, and vibrant culture. Visitors can explore the ancient town of Hoi An, visit the stunning Japanese Covered Bridge, or relax on the beautiful An Bang Beach. Hoi An is also known for its delicious cuisine, such as the local specialty dish cao lau.",
        img: "https://images.unsplash.com/photo-1558334466-afce6bf36c69?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      },
      {
        Location: "Luang Prabang, Laos",
        Price: "$300",
        Description:
          "Luang Prabang is a beautiful city in Laos known for its historic temples, stunning waterfalls, and laid-back atmosphere. Visitors can explore the many ancient temples, such as Wat Xieng Thong and Wat Mai, visit the stunning Kuang Si Falls, or take a boat ride on the Mekong River. Luang Prabang is also known for its delicious cuisine, such as the local specialty dish laap.",
        img: "https://images.unsplash.com/photo-1633984904221-29bb70dffef8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      },
    ];
    //Shuffle the array
    tripRecommendations.sort(() => Math.random() - 0.5);

    let date;
    const trips = [];
    ranges.forEach((range, index) => {
      if (
        moment(calendar[range.start].date).year() ==
        moment(calendar[range.end].date).year()
      ) {
        date = `${moment(calendar[range.start].date).format(
          "MMMM Do"
        )} to ${moment(calendar[range.end].date).format("MMMM Do, YYYY")}`;
      } else {
        date = `${moment(calendar[range.start].date).format(
          "MMMM Do, YYYY"
        )} to ${moment(calendar[range.end].date).format("MMMM Do, YYYY")}`;
      }

      trips.push({
        location: tripRecommendations[index].Location,
        date: date,
        price: tripRecommendations[index].Price,
        description: tripRecommendations[index].Description,
        img: tripRecommendations[index].img,
      });
    });

    return trips;
  },
};
