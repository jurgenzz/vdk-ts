const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
var path = require('path');
var BUILD_DIR = path.resolve(__dirname, './public/js');
var APP_DIR = path.resolve(__dirname, './app/');

let production = true;
var config = {
	mode: 'development',
	entry: {
		main: APP_DIR + '/index.tsx',
	},
	output: {
        path: BUILD_DIR
    },
	devtool: '',
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
	},
	module: {
		rules: [
			{
				test: /\.ts(x?)$/,
				include: APP_DIR,
				loader: 'ts-loader'
			},
			{
				exclude: /node_modules/,
				test: /\.js?/,
				include: APP_DIR,
				loader: 'babel-loader'
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			  }
		]
	},
	plugins: [
		new MonacoWebpackPlugin({
			languages: ['javascript']
		})
	  ]
}


module.exports = config;