const mongoose = require("mongoose");

const dbconnect = async (URI) => {
  await mongoose.connect(URI);
  console.log("connected to database");
};

module.exports = dbconnect;
