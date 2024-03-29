const mongoose = require("mongoose");
require('dotenv').config();

//const url = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB);
        console.log('MongoDB Connected');
    } catch(err) {
        console.error(err.message);
        //exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;