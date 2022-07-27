const express = require("express");
const connectDB = require("./config/db");

const app = express();
const port = process.env.PORT || 4000;

//Connect DB
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Running"));

//Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/list", require("./routes/api/list"));

app.listen(port, () => console.log("Server is running on Port: " + port));

// router.get("/", function (req, res) {
//   res.sendFile(path.join(__dirname + "/index.html"));
//   //__dirname : It will resolve to your project folder.
// });

//app.use(express.static("public"));

//app.use("/", router);

// app.get("/express_backend", (req, res) => {
//   res.send({ express: "Express Backend Connected to React" });
// });

// app.listen(port, () => console.log("Server is running on Port: " + port));

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
