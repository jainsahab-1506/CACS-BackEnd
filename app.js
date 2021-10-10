const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const eventRouter = require("./Admin/routes/event");
const userRouter = require("./Admin/routes/user");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: process.env.SITE_URL,
    optionsSuccessStatus: 200,
  })
);

mongoose.connect(
  "mongodb+srv://admin-naman:" +
    process.env.CLUSTER_PASSWORD +
    "@cluster0.3djy5.mongodb.net/CACSPortalDB?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  () => {
    console.log("Database connected.");
  }
);

app.use("/events", eventRouter);
app.use("/users", userRouter);

app.get("/", function (req, res) {
  res.send("Hello");
});

app.listen(process.env.PORT || 8000, function (req, res) {
  console.log("Running");
});
