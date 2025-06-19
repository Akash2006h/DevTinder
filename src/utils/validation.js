const validator = require("validator");
const validateSignUp = (req) => {
  const {firstName, lastName, emailId, password} = req.body;
  if(!firstName || !lastName){
    throw new error("name is Not Valid")
  }
  else if(!validator.isEmail(emailId)){
    throw new error("email is Invalid")
  }
  else if(!validator.isStrongPassword(password)){
    throw new error("Please Enter A Strong password")
  } 
}
module.exports = {
  validateSignUp,
}
