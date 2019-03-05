const htmlWebpackPlugin = require("html-webpack-plugin");
const cleanWebpackPlugin = require("clean-webpack-plugin");
const { appDirectory, buildDirectory } = require("./filePaths");

module.exports = {
  entry: {
    bundle: `${appDirectory}/index.js`,
    vendor: ["react", "react-dom", "react-router-dom"]
  },

  output: {
    path: buildDirectory,
    publicPath: "/",
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.css$|.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]"
        }
      }
    ]
  },
  plugins: [
    new cleanWebpackPlugin(),

    new htmlWebpackPlugin({
      template: `${appDirectory}/index.html`,
      filename: `${buildDirectory}/index.html`
    })
  ],
  devServer: {
    compress: true,
    contentBase: buildDirectory,
    historyApiFallback: true
  }
};
