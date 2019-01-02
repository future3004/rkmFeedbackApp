const express = require("express");
const app = express();

// app url: https://frozen-bayou-13794.herokuapp.com/

app.get("/", (req, res) => {
  res.send({ hi: "Richard KM! What can i do for you today?" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
