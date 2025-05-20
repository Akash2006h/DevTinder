const express = require("express");
const app = express();
const PORT = process.env.PORT || 1234;
const {adminAuth, userAuthorization} = require("./utils/auth")
app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res) => {
  res.send("Heroo")
})
app.use("/Aka", (req, res) => {
  res.send("yooo ")
})
app.use("/user", userAuthorization)
app.use("/user/access", (req, res, next) => {
  res.send("hello")
})

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})
