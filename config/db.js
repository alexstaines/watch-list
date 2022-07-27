const mongoose = require("mongoose");
const config = require('config');
const url = config.get('MONGO_URI');

//const url = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(url);
        console.log('MongoDB Connected');
    } catch(err) {
        console.error(err.message);
        //exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;

// const connectionParams = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };
// mongoose
//   .connect(url, connectionParams)
//   .then(() => {
//     console.log("Connected to the database ");
//   })
//   .catch((err) => {
//     console.error(`Error connecting to the database. n${err}`);
//   });