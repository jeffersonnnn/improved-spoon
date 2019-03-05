const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "/dist") });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Server Started at port 8080");
});
