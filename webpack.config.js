const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],  // Process CSS files
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',  // Handle image files
        loader:'file-loader',
        options:{
            name: '[path][name].[ext]',
            outputPath:'image',
            publicPath: 'image',
        },
        generator:{

        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',  // Transpile JavaScript files (if needed)
      },
    ],
  },

  plugins: [
    new CopyWebpackPlugin({
        patterns: [
          { from: 'public/images', to: 'images' }, // Copy everything from 'public' to 'dist'
        ],
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'public/3d', to: '3d' }, // Copy everything from 'public' to 'dist'
        ],
      }),
    new HtmlWebpackPlugin({
      template: './public/index.html',  // Template HTML file
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: './public/threejs.html',  // Additional HTML file
      filename: 'threejs.html',
    }),
    new HtmlWebpackPlugin({
        template: './public/WIP.html',  // Additional HTML file
        filename: 'WIP.html',
      }),
      new HtmlWebpackPlugin({
        template: './public/Contacts.html',  // Additional HTML file
        filename: 'Contacts.html',
      }),
  ],

  devServer: {
    static: path.join(__dirname, 'dist'),  // Directory to serve static files
    compress: true,
    port: 9000,
    open: true,
    hot: true,
    liveReload: true
  },

  resolve: {
    extensions: ['.js'],
  },
};