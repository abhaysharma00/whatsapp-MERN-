require("dotenv").config();

const express = require("express");
const connectDB = require("./db/connect.js");
const router = require("./routes/index.js");
const cors = require("cors");
//

const app = express();

// middleware
app.use(cors());
app.use(express.json());
//

app.use("/", router);

// Server starting and connecting DB
const port = 9000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`listening at ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
