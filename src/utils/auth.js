const jwt = require("jsonwebtoken");
const User = require("../models/user.js")

const userAuth = async (req, res, next) => {
  console.log("Cookies: ", req.cookies); // Check if token is there

  try {
  const { token } = req.cookies;
  if(!token) {
    throw new Error("Token is Invalid")
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  const user = await User.findById(decoded.userId);
  if(!user){
    throw new Error("user need to login")
  }
  req.user = user;
  next();
}
catch (err) {
  res.status(404).send("User Not Found")
}


} 

module.exports = { userAuth };

