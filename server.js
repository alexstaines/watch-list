const express = require("express");
const connectDB = require("./config/db");
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());

//Connect DB
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Running :)"));

//Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/list", require("./routes/api/list"));

app.listen(port, () => console.log("Server is running on Port: " + port));
