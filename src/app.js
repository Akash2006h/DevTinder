
/*const express = require("express");
const app = express()
const PORT = process.env.PORT || 3000
app.use((req,res) =>{
  res.send("hello world")
})
app.get(PORT, () => {
  console.log(`server is login in port{PORT} `)
  
})*/
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.use("/user", (req, res) => {
  //res.send("Response1")
},
(req, res) => {
  console.log("respones")
  res.send("Response2")
})
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

