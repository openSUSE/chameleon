const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'production',
  entry: {
    chameleon: './src/js/chameleon.js',
    'chameleon-bs3': './src/js/chameleon-bs3.js',
    'chameleon-wiki': './src/js/chameleon-wiki.js',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist/js',
    chunkLoading: false,
    wasmLoading: false,
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js", to: __dirname + "/dist/js" },
        { from: "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js.map", to: __dirname + "/dist/js" },
        { from: "*", context: "src/sass", to: __dirname + "/assets/stylesheets" }
      ],
    }),
  ],
};
