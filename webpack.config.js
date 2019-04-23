var webpack = require('webpack');
var path = require('path');
// var LiveReloadPlugin = require('webpack-livereload-plugin');
// var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
// var header = process.env.
// var BUILD_DIR = path.resolve(__dirname, production ? 'js/build' : 'js');
var BUILD_DIR = path.resolve(__dirname, 'src/web/public/js/build');
var APP_DIR = path.resolve(__dirname, 'src/web/public/js/');

let production = false;
var config = {
	entry: {
		main: APP_DIR + '/index.js',
	},
	output: {
        path: BUILD_DIR
    },
	devtool: production ? '' : 'source-map',
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
	},
	module: {
		rules: [
			// {
			// 	test: /\.ts(x?)$/,
			// 	include: APP_DIR,
			// 	loader: 'ts-loader'
			// },
			{
				exclude: /node_modules/,
				test: /\.js?/,
				include: APP_DIR,
				loader: 'babel-loader'
			}
		]
	}
}


module.exports = config;