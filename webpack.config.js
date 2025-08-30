const CopyPlugin = require("copy-webpack-plugin");
const autoprefixer = require('autoprefixer')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'production',
  entry: {
    chameleon: './src/js/chameleon.js',
    'chameleon-wiki': './src/js/chameleon-wiki.js',
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 8080,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: miniCssExtractPlugin.loader
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader'
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer
                ]
              }
            }
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader',
            options: {
              sassOptions: {
                // Optional: Silence Sass deprecation warnings. See note below.
                silenceDeprecations: [
                  'mixed-decls',
                  'color-functions',
                  'global-builtin',
                  'import'
                ]
              }
            }
          }
        ]
      }
    ]
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
        { from: "*", context: "src/fonts", to: __dirname + "/dist/fonts" },
        { from: "*", context: "src/images", to: __dirname + "/dist/images" },
        { from: "*", context: "src/fonts", to: __dirname + "/assets/stylesheets/fonts" },
        { from: "*", context: "src/sass", to: __dirname + "/assets/stylesheets" },
        { from: "*", context: "src/images", to: __dirname + "/assets/images" }
      ],
    }),
    new miniCssExtractPlugin({
      filename: "../css/[name].css"
    }),
    new HtmlWebpackPlugin({ template: './dist/index.html' }),
  ],
};
