const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const path = require('path');
const webpack = require("webpack");

const rules = [
    {
    test: /\.jsx?$/,
    exclude: path.join(__dirname, 'node_modules'),
    use: [
        {
            loader: 'babel-loader',
        }
    ]
    },
    {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
    },
    {
        test: /\.(jpg|png|gif|svg|webp)$/,
        loader: 'url-loader?limit=8000'

    }
];

const client = {
    mode: 'development',
    entry: path.resolve(__dirname,'./src/client.js'),
    devtool: 'inline-source-map',
    devServer: {
        port: 3000,//控制端口
        open: true, //是否自动打开默认浏览器
        contentBase: './dist',
        hot: true
    },
    output: {     
    path: path.resolve(__dirname,'./dist/public'),     
    filename: 'bundle.js'}, 
    module: { rules },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
 };

 const server = {
    mode: 'development',
    entry: path.resolve(__dirname,'./src/server.js'),
    output: {
        path: path.resolve(__dirname,'./dist'),
        filename: 'server.js',
    },
    module: { rules },
    target: 'node',
    externals: [nodeExternals()]
 };

 module.exports = [client, server];