const mongoose = require("mongoose")
const connectDB = async() => {
    await mongoose.connect("mongodb+srv://makashmkarki:zWk5nieBKRfYkGA4@tinder.jershmo.mongodb.net/devTinder")
};
module.exports = connectDB; 
