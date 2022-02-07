const path = require("path")

module.exports = {
  entry: path.resolve(__dirname, "../fixtures/entry.js"),
  mode: "development",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../build"),
  },
  plugins: [],
  resolve: {
    modules: ["web_modules", "node_modules"],
  },
}
