var path = require("path");

module.exports = {
  entry: "./js/main.js",
  output: {
    path: path.resolve(__dirname),
    filename: "_bundle.js",
  },
};
