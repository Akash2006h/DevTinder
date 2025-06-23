
const express = require("express")
const requestRouter = express.Router() ;
const { userAuth } = require("../utils/auth.js")



requestRouter.get("/sendConnectionRequest",userAuth , async(req, res) => {
  const user = req.user;

  res.send(user)
}) 
module.exports = requestRouter ;

