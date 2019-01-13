const mongoose = require("mongoose");
//const Schema = mongoose.Schema; same as below
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String
});

// parameters: 1st -- collection name 2nd --schema
mongoose.model("users", userSchema);
