const express = require("express")
const authRouter = express.Router();
const {validateSignUp} = require("../utils/validation.js")
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const User  = require("../models/user.js")

authRouter.post("/signup", async (req, res) => {
try{
  validateSignUp(req)
  const {firstName, lastName, emailId, password} = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  console.log(passwordHash)

  const user = new User({
    firstName,
    lastName,
    emailId,
    password: passwordHash,
  });


  
    
  const savedUser = await user.save(); 

  const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );


  res.cookie("token",token ,{
  httpOnly: true,
  secure: false
  })

  res.status(201).send({ message: "User created successfully" });
}
    catch (err) {
      console.error("Error during message:", err)
      res.status(400).send("Error Saving The Message.")
    }
})

authRouter.post("/login", async(req, res) => {
  try {
    console.log('Received request body:', req.body);
    const {emailId, password} = req.body
    const user = await User.findOne({emailId: emailId});
    if(!user) {
      throw new Error ("Email id is not present")
    }
    if(!password || !user.password){
      console.log("Check password and Hash password")
      throw new Error("password is not present")
    }

    const isPasswordIsValid = await bcrypt.compare(password, user.password);
    
    
    // ✅ Generate JWT
   const token = await user.getJWT();

    res.cookie("token", token, {
    httpOnly: true,
    secure: false, 
    });



    
    if(isPasswordIsValid) {
      res.status(200).json({message: "Login Succesfully"})
    }
    else{
      throw new Error("password is Invalid");
    }



  }catch (err) {
    res.status(400).send("ERROR :" +err.message)
  } 
})
authRouter.patch("/user", async (req, res) => {
  const emailId = req.body.emailId;
  const data = req.body;
  try{
    const ALLOWED_UPDATES = ["firstName", "lastName", "age", "about", "skills"]
    const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));
    if(!isUpdateAllowed) {
      throw new Error("Update Not Allowed" + Error)
    }
  }
  catch (err){
     res.status(404).send("errors" + err.message)
  }
  try {
    const users = await User.findByIdAndUpdate({emailId: emailId}, data, {
      returnDocument: "after",
      runValidators: "true",
    })

    if(!users){
      res.status(404).send("No users")
    }
    else{
      res.send(users)
    }
    
  } catch (err) {
        res.status(404).send("errors" + err.message)

  }
})


module.exports = authRouter
