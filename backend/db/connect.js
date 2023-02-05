const mongoose = require("mongoose");

const connectDB = (url) => {
  const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useUnifiedTopology: true,
  };
  return mongoose.connect(url, option);
};

module.exports = connectDB;
