//Import necessary packages and module exports
const express = require("express");
const router = require("./router");
const cors = require("cors");
require("dotenv").config();

//Set the port to use and create an instance of Express
const app = express();

//Body Parser and CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Apply the router
app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} 😀`);
});
