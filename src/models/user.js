const mongoose = require("mongoose")
const validator = require ("validator")
const jwt = require ("jwt")

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
    validate(value) {
      if(!validator.isEmail(value)){
        throw new Error ("invalid email address: " + value)
      }
    }
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
},
  {
    timestamps: true,
  }
)

userSchema.methods.getJWT = async function () {
  const user = this 
      const token = await jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );
  return token ; 
  
}

module.exports = mongoose.model("User", userSchema)
