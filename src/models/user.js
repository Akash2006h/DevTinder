const mongoose = require("mongoose")
const  {Schema} =  mongoose
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minLength:4,
    maxLength:50,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required:true,
    unique:true,
    lowercase: true,
    trim:true,
  },
  password: {
    type: String,
  },
  age: {
    type: String,
    min: 18,
  },
  gender: {
    type: String,
    validate(value) {
      if (!["male", "female", "others" ].includes(value)) {
        throw new Error ("Gender is invalid")
      }
    }
  },
  photoUrl: {
    type: String,
    default: "https://as2.ftcdn.net/jpg/02/44/43/69/1000_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
 
  },
  about: {
    type: String,
  },
  skills: {
    type: [String],
  }
})
module.exports = mongoose.model("User", userSchema)
