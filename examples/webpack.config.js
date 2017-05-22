const fs = require('fs'),
    path = require('path'),
    webpack = require('webpack');

module.exports = {
    devtool: 'eval-source-map',
    entry: {
        "outputs/app": path.resolve(__dirname, './app.js')
    },
    output: {
        path: path.resolve(__dirname, './'),
        publicPath: '/',
        filename: '[name].js',
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.vue$/, loader: 'vue-loader' }
        ]
    },
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.common.js',
            'vue-verify': path.resolve(__dirname, '../src/index.js')
        }
    },
    devServer: {
        hot: true,
        contentBase: __dirname,
        port: 3000,
        historyApiFallback: true,
    }
}