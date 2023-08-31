if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod_env");
} else {
  module.exports = require("./dev_env");
}