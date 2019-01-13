// figure out what credentials to use
if (process.env.NODE_ENV === "production") {
  //we are in production -- return prod set of keys
  module.exports = require("./prod");
} else {
  //here we are in development - return dev keys
  module.exports = require("./dev");
}
