const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
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
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader'
            ],
        })
    }
];

const client = {
    mode: 'development',
    entry: {
        app: path.resolve(__dirname, './src/client.js')
    },
    output: {   
        publicPath: './',
        path: path.resolve(__dirname,'./dist/public'),
        sourceMapFilename: '[file].map',
        filename: 'bundle.js'}, 
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".json"]
    },
    module: { rules },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
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