
const express = require("express")
const profileRouter = express.Router() ;
const { userAuth } = require("../utils/auth.js")


profileRouter.get("/profile",userAuth , async(req, res) => {
  const user = req.user;

  res.send(user)
}) 
module.exports = profileRouter ;
