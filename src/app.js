const express = require("express")
const app = express()
const PORT = process.env.PORT || 1234
const connectDB = require("./config/database.js")
const User  = require("./models/user.js")
app.use(express.json())




app.get("/user", async (req, res) => {
  const UserEmail = req.body.emailId;
  try{
    const users = await User.find({emailId: UserEmail})
    if(users.length == 0){
          res.status(404).send("No Users");
    }
    else{
          res.send(users)
    }
  }
  catch(err) {
    console.error("User not found", err.message);    
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




app.post("/signup",  async (req, res) => {
  console.log(req.body)
  try{
    const user = new User(req.body)
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







