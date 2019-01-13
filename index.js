const express = require("express");
const authRoutes = require("./routes/authRoutes");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");

require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

// app url: https://frozen-bayou-13794.herokuapp.com/
// local: http://localhost:5000/

// app.get("/", (req, res) => {
//   res.send({ hi: "Richard KM! What can i do for you today?" });
// });
// app routes
//Also valid: require("./routes/authRoutes")(app);
authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
