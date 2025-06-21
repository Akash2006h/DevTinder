const express = require("express")
const app = express()
const PORT = process.env.PORT || 1234
const connectDB = require("./config/database.js")
const User  = require("./models/user.js")
const {validateSignUp} = require("./utils/validation.js")
const { userAuth } = require("./utils/auth.js")
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
app.use(express.json())
//middleware
app.use(cookieParser())
require('dotenv').config({path: './config/myenv.env'})
app.post("/signup", async (req, res) => {


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
app.post("/login", async(req, res) => {
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
app.get("/profile",userAuth , async(req, res) => {
  const user = req.user;

  res.send(user)
 
})

app.patch("/user", async (req, res) => {
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





app.get("/byid", async (req, res) => {
  const id = req.query.id

  try {
    const user = await User.findByIdAndUpdate(id);
    if (!user) {
      res.status(404).send("No User")
    }else{
      res.send(user)
    }
    
  } catch (err) {
    res.status(404).send("something is wrong with try catch for /byid")
    
  }


})


app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
   const user = await User.findByIdAndDelete(userId)
    
    if(!user){
      res.status(404).send("user not found")
    }
    else{

      res.send("user is deleted",user)
    }
    } catch (err) {
    res.status(404).send("user not found", err.message
   )
    
  }
});




app.get("/user", async (req, res) => {
  const UserEmail = req.query.emailId;
  try{
    const users = await User.find({emailId: UserEmail})
    if(users.length == 0){
          res.status(404).send("No Users");
    }
    else{
          res.send(users)
    }
  }
  catch{
    console.error("User not found");    
  }
})

app.get("/feed", async(req, res) => {
  try{
    const allUsers = await User.find({})
    res.send(allUsers)

  }
  catch(err) {
        res.status(404).send("No Users", err.message);

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







