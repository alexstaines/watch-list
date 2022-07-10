const mongoose = require("mongoose");
const express = require("express");
const app = express();
const anime = require("./model");
const router = express.Router();
const path = require('path');
const port = 4000;
require('dotenv').config();

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
  //__dirname : It will resolve to your project folder.
});

app.use("/", router);

app.listen(port, function () {
  console.log("Server is running on Port: " + port);
});

// db connection
const url = process.env.MONGO_URI;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log("Connected to the database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
  });

// var data = [
//   {
//     title: "Made in Abyss",
//     averageRating: 8.5,
//     synopsis: "lovcraftian ghibli",
//     watched: false,
//     watchedEps: 15,
//   },
// ];

// router.route("/insertdata").post(function (req, res) {
//     anime.insertMany(data, function (err, result) {
//       if (err) {
//         res.send(err);
//       } else {
//         res.send(result);
//       }
//     });
//   });
