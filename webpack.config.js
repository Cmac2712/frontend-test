const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('./package.json')
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
	entry: './src/js/index.js',
  	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, './build')
  	},
	stats: {
		modules: false,
		entrypoints: false
	},
  	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: pkg.name,
			template: './src/index.html',
			filename: 'index.html'
		}),
    	new VueLoaderPlugin()
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src/')
		}
	},
  	module: {
		rules: [{
            test: /\.scss$/,
            use: [
                "style-loader",
                "css-loader",
                "sass-loader"
            ]
        },
        {
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			use: {
		  		loader: 'babel-loader',
			}
	  	},
		{
			test: /\.(ico)$/,
			use: {
		  		loader: 'file-loader'
			}
		},
		{
			test: /\.vue$/,
			loader: 'vue-loader'
		},
		{
			enforce: 'pre',
			test: /\.(js|vue)$/,
			loader: 'eslint-loader',
			exclude: /node_modules/
      	}
	]
	},
	devtool: 'eval-source-map'
}
