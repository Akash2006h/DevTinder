
require("dotenv").config();

const apiKey = process.env.SECRET_KEY_MONGODB
const mongoose = require("mongoose")


const connectDB = async() => {
      await mongoose.connect(`mongodb+srv://makashmkarki:${apiKey}@tinder.jershmo.mongodb.net/devTinder`)

};
module.exports = connectDB; 
