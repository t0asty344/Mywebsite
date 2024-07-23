const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    mode: 'production',  // Set to 'production' for production builds

  entry: './src/main.js',  // Entry point for your application
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,  // Clean the output directory before each build
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],  // Process CSS files
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',  // Handle image files
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',  // Transpile JavaScript files (if needed)
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',  // Template HTML file
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: './public/threejs.html',  // Additional HTML file
      filename: 'threejs.html',
    }),
  ],

  devServer: {
    static: path.join(__dirname, 'dist'),  // Directory to serve static files
    compress: true,
    port: 9000,
  },

  resolve: {
    extensions: ['.js'],
  },
};