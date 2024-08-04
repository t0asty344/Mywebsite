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
      systemvars: true, // This line is important to load variables from the system environment
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
        template: './public/tests.html',  // Additional HTML file Contacts
        filename: 'tests.html',
      }),
      new HtmlWebpackPlugin({
        template: './public/chat.html',  // Additional HTML file Contacts
        filename: 'chat.html',
        chunks: ['app']
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