const aqiModel = require("../models/aqi");

exports.findAllCountries = (req, res) => {
  try {
    aqiModel.find({}, (err, data) => {
      if (err) {
        res.status(404).json({ message: "Data unavailable" });
      }
      res.status(200).json({ data });
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.findOneCountryAQI = (req, res) => {
  try {
    aqiModel.findOne({ _id: req.query.aqiId }, (err, data) => {
      if (err) {
        res.status(404).json({ message: "Data unavailable" });
      }
      res.status(200).json({ data });
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
