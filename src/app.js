const express = require("express")
const app = express()
const PORT = process.env.PORT || 1234
const connectDB = require("./config/database.js")
const User  = require("./models/user.js")
app.use("/signup",  async (req, res) => {
  try{
    const user = new User({
      firstName: "Aditya",
      lastName: "karki",
      emailId: "aditya@gmail.com",
      password: "password",
  })
   await user.save(); 
   res.send("user saved succesfully")  
  }
  catch(err){
    console.error("erron on the server", err.message);
  }
})









connectDB()
.then(()=>{
  console.log("Database connetion established")
  app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`)
  });
})
  .catch((err) => {
    console.error("Database cannot be connected", err.message);
})

