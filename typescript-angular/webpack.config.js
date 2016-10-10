var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

module.exports = {
    entry: ['./src/app.ts'],
    output: {
        filename: './app/bundle.js',
        publicPath: './app'
    },
    // Currently we need to add '.ts' to the resolve.extensions array.
    resolve: {
        extensions: ['', '.ts', '.tsx', '.js', '.jsx']
    },

    // Source maps support ('inline-source-map' also works)
    devtool: 'source-map',

    devServer: {
        contentBase: path.resolve(__dirname, 'app'),
    },

    plugins: [
        new CopyWebpackPlugin([
            { from: './index.html', to: './app/index.html' },
            { from: './src/data/*.json', to: './app/data', flatten: true },
            { from: './src/routes/*.html', to: './app/routes', flatten: true }
        ])
    ],

    // Add the loader for .ts files.
    module: {
        loaders: [{
            test: /\.ts$/,
            loader: 'awesome-typescript-loader'
        }]
    }
};