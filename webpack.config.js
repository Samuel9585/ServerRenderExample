const nodeExternals = require('webpack-node-externals');
const path = require('path');

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
    }
];

const client = {
    mode: 'development',
    entry: path.resolve(__dirname,'./src/client.js'),
    output: {     
        path: path.resolve(__dirname,'./dist/public'),     
        filename: 'bundle.js'}, 
    module: { rules }
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