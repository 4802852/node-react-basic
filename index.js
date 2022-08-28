const express = require("express");
const app = express();
const port = 3000;

const secret_key = require("./secret_key.json");

const mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://4802852:" + secret_key.password + "@cluster0.7uhuwcr.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
