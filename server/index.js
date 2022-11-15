//Import necessary packages and module exports
const express = require("express");
const router = require("./router");
const cors = require("cors");
require("dotenv").config();

//Set the port to use and create an instance of Express
const app = express();
const PORT = 3001;

//Body Parser and CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Apply the router
app.use(router);

app.listen(PORT, () => {
  console.log(`DaysOff server is listening on port ${PORT}`);
});
