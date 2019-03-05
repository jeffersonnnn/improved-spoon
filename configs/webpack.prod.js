const webpack = require("webpack");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const merge = require("webpack-merge");
const commonConfig = require("./webpack.common");
const envSettings = require("./globalEnv");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const uglifyJS = new UglifyJsPlugin({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  cache: true,
  parallel: true
});

module.exports = merge(commonConfig, {
  mode: "production",
  devtool: false,
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  optimization: {
    minimizer: [uglifyJS],
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles",
          test: /\.scss$/,
          chunks: "all",
          enforce: true
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin(envSettings),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.scss$/g,
      cssProcessor: require("cssnano"),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    }),
    uglifyJS
  ]
});
