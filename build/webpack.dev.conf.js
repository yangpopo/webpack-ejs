const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = require('../config')
var fs = require("fs");

let entry = {},
	plugins = [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
	];

//多页面
let files = fs.readdirSync(process.cwd() + '\\src\\page\\')
function checkAdult(age) {
    return age != "common";
}
let components = files.filter(checkAdult)

components.forEach((page) => {
	entry[page] = path.resolve(__dirname, '../src/page/' + page + '/' + page + '.js');
	plugins.push(new HtmlWebpackPlugin({
		favicon: 'static/favicon.ico',
		filename: page + '.html',
		minify: true,
		chunks: [page],
		template: path.resolve(__dirname, '../src/page/' + page + '/' + page + '.ejs')
	}))
});

plugins.push(new CopyWebpackPlugin([{
	from: path.resolve(__dirname, '../static'),
	to: 'static',
	ignore: ['.*']
}]));

module.exports = {
	mode: 'development',
	entry: entry,
	output: {
		publicPath: '/',
		filename: 'js/[name].js',
		path: path.resolve(__dirname, '../dist')
	},
	devtool: 'cheap-module-eval-source-map',
	devServer: {
//		publicPath: config.dev.assetsPublicPath,
//		host: config.dev.host,
//		port: config.dev.port,
		clientLogLevel: 'error',
		contentBase: path.join(__dirname, "../dist"),
		inline: true,
		hot: true,
		compress: true,
		lazy: false,
		open: true,
		overlay: {
			warnings: true,
			errors: true
		},
		watchOptions: {
			poll: true
		}
	},
	module: {
		rules: [{
				test: /\.ejs$/,
				exclude: /node_modules/,
				use: [{
					loader: 'ejs-loader?variable=data'
				}]
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					}
				}
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.scss$/,
				use: [{
					loader: "style-loader" // 将 JS 字符串生成为 style 节点
				}, {
					loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
				}, {
					loader: "sass-loader", // 将 Sass 编译成 CSS
				}
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [{
					loader: 'url-loader',
					options: {
						name: 'img/[name].[ext]',
						limit: 1024 // 体积1024k就转成base64
					}
				}]
			}
		]
	},
	plugins: plugins
};