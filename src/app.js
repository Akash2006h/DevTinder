const express = require("express")
const app = express()
const PORT = process.env.PORT || 1234
const connectDB = require("./config/database.js")
const User  = require("./models/user.js")
const {validateSignUp} = require("./utils/validation.js")
const { userAuth } = require("./utils/auth.js")
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser")
// const jwt = require("jsonwebtoken")
const authRouter = require("./routes/authRouter.js");
const profileRouter = require("./routes/profileRouter.js");
const requestRouter = require("./routes/requestRouter.js")





app.use(express.json())
app.use(cookieParser())




app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)




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







