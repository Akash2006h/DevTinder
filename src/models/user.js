const mongoose = require("mongoose")
const  {Schema} =  mongoose
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required:true,
    unique:true,
  },
  password: {
    type: String,
  },
  age: {
    type: String,
  },
  gender: {
    type: String,
  },
})
module.exports = mongoose.model("User", userSchema)
