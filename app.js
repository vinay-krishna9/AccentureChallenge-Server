const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
require("./config/database").connect();
const user = require("./routes/user");
const app = express();

var corsOptions = {
  origin: "http://localhost:8100",
};

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors(corsOptions));

app.use("/user", user);

app.get("/", (req, res, err) => {
  res.send("Hello World!!!");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
