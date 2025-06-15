const express = require("express")
const app = express()
const PORT = process.env.PORT || 1234
const connectDB = require("./config/database.js")
const User  = require("./models/user.js")
app.use(express.json())
require('dotenv').config({path: './config/myenv.env'})


app.patch("/user", async (req, res) => {
  const emailId = req.body.emailId;
  const data = req.body;
  try {
    const users = await User.findOneAndUpdate({emailId: emailId}, data, {
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
    const user = await User.findById(id);
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







