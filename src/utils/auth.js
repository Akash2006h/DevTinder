
const adminAuth = (req, res, next) =>{
  console.log("Admin is here")
  const Token = "xyz";
  const isAdminAuthorzied = Token === "xyz";
  if(!isAdminAuthorzied){
    res.status(401).send("Unauthorized User")
  }
  else{
    next();
  }
};

const userAuthorization = (req, res, next) => {
  const userId = "1233";
  const authorixedId = userId === "1233";
  if(!authorixedId){
    res.status(401).send("userAuthorized User");
  }
  else{
    next();
  }
  
  
}
module.exports = {
  adminAuth,
  userAuthorization
};

