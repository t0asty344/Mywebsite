const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');




module.exports = {

    mode: 'production',  // Set to 'production' for production builds

  entry: {
    main:'./src/main.js',
    app: './src/app.js',
    todo:'./src/todo.js',
    learning:'./src/learning.js',
    Documentation:'./src/Documentation.js'
  },  // Entry point for your application
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
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
    new CleanWebpackPlugin(),
    new Dotenv({
      systemvars: true,
    }),
    new webpack.DefinePlugin({
      'process.env.SUPABASE_URL': JSON.stringify(process.env.SUPABASE_URL),
      'process.env.SUPABASE_APIKEY': JSON.stringify(process.env.SUPABASE_APIKEY),
    }),
    new CopyWebpackPlugin({
        patterns: [
          { from: 'public/images', to: 'images' }, // Copy everything from 'public' to 'dist'
        ],
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'public/3d', to: '3d' }, // Copy everything from 'public' to '3d'
        ],
      }),
    new HtmlWebpackPlugin({
      template: './public/index.html',  // Template HTML file index
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: './public/threejs.html',  // Additional HTML file three
      filename: 'threejs.html',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
        template: './public/WIP.html',  // Additional HTML file WIP
        filename: 'WIP.html',
      }),
      new HtmlWebpackPlugin({
        template: './public/Contacts.html',  // Additional HTML file Contacts
        filename: 'Contacts.html',
      }),
      new HtmlWebpackPlugin({
        template: './public/tests.html',  // Additional HTML file tests
        filename: 'tests.html',
      }),
      new HtmlWebpackPlugin({
        template: './public/chat.html',  // Additional HTML file chat
        filename: 'chat.html',
        chunks: ['app']
      }),
      new HtmlWebpackPlugin({
        template: './public/todo.html',  // Additional HTML file todo
        filename: 'todo.html',
        chunks: ['todo']
      }),
      new HtmlWebpackPlugin({
        template: './public/learning.html',  // Additional HTML file todo
        filename: 'learning.html',
        chunks: ['learning']
      }),
      new HtmlWebpackPlugin({
        template: './public/Documentation.html',  // Additional HTML file todo
        filename: 'Documentation.html',
        chunks: ['Documentation']
      }),
      
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

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