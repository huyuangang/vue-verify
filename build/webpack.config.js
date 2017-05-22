let path = require('path'),
    webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: {
        'index': path.resolve(__dirname, '../src/index.js')
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader?cacheDirectory',
                exclude:/node_modules/
            }
        ]
    },
    devServer: {
        hot: true,
        port:3000,
        historyApiFallback:true
    }
}