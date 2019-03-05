const merge = require("webpack-merge");
const dotenv = require("dotenv");
const webpack = require("webpack");
const commonConfig = require("./webpack.common");

const env = dotenv.config().parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = merge(commonConfig, {
  mode: "development",
  devtool: "inline-source-map",
  plugins: [new webpack.DefinePlugin(envKeys)]
});
