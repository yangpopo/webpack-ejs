const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 提取css
const devMode = process.env.NODE_ENV !== 'production';
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css代码
let UglifyJsPlugin = require("uglifyjs-webpack-plugin");//优化js如压缩
const config = require('../config')
let CleanWebpackPlugin = require("clean-webpack-plugin");
var fs = require("fs");

//const ExtractTextPlugin = require('extract-text-webpack-plugin'); // 分离scss成独立文件
let plugins = [],
	entry = {};

// 提取css
plugins.push(new MiniCssExtractPlugin({
	filename: '/css/[name].css',
	chunkFilename: '/css/[name].css',
	ignoreOrder: false, // 忽略排序
}));

// 清空过去打包的文件
plugins.push(new CleanWebpackPlugin(["dist"],{ 
      root: path.resolve(__dirname, '..'),
      dry: false  // 启用删除文件
    }));


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
//		minify: {
//			collapseWhitespace: true,
//			removeComments: true,
//			minifyJS: true,
//			minifyCSS: true
//		},
		minify: false, // 不压缩html
		chunks: [page],
		template: path.resolve(__dirname, '../src/page/' + page + '/' + page + '.ejs')
	}))
});
//复制静态文件
plugins.push(new CopyWebpackPlugin([{
	from: path.resolve(__dirname, '../static'),
	to: 'static',
	ignore: ['.*']
}]));

module.exports = {
	mode: 'production',
	entry: entry,
	output: {
		publicPath: config.build.assetsPublicPath,
		filename: 'js/[name].js',
		path: config.build.assetsRoot
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
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: process.env.NODE_ENV === 'development',
							publicPath:'../' // 配置css背景引用图片路径
						},
					},
					{
						loader:'css-loader',
					},
					{
						loader:'sass-loader',
					}
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [{
					loader: 'url-loader',
					options: {
						name: 'img/[name].[ext]',
						limit: 1024, // 体积1024k就转成base64
					}
				}]
			}
		]
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					//minSize : 1,
					name: 'commons',
					chunks: "all",
					minChunks: 2
				}
			}
		},
		minimizer:[
			new UglifyJsPlugin({ // js优化压缩
                cache: true,//缓冲
                parallel: true, //并发打包,一次打包多个
                sourceMap:true,//源码调试
            }),
			new OptimizeCSSAssetsPlugin({}),
		]
	},
	plugins: plugins
};