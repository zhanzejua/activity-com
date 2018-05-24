'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')  // 默认是index文件
const merge = require('webpack-merge')// 将基础配置和开发环境配置或者生产环境配置合并在一起的包管理
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')// 查看空闲端口位置，默认情况下搜索8000这个端口
const ips = getLocalIps();

const HOST = ips.length ? ips[0] : config.dev.host;//processs为node的一个全局对象获取当前程序的环境变量，即host
const PORT = process.env.PORT && Number(process.env.PORT) || config.dev.port;

const devWebpackConfig = merge(baseWebpackConfig, {
	module: {
		rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
	},
	// cheap-module-eval-source-map is faster for development
	devtool: config.dev.devtool,

	// these devServer options should be customized in /config/index.js
	devServer: {
		clientLogLevel: 'warning',
		historyApiFallback: {
			rewrites: [
				{ from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
			],
		},
		hot: true, // 启动模块热更新特性
		contentBase: false, // since we use CopyWebpackPlugin.
		compress: true, // 一切服务都启动用gzip方式进行压缩代码
		host: HOST,
		port: PORT,
		open: config.dev.autoOpenBrowser, //开服务器是否自动开默认浏览器
		overlay: config.dev.errorOverlay
			? { warnings: false, errors: true }
			: false,  // 当出现编译器错误或警告时，在浏览器中显示全屏叠加,覆盖到浏览器的项目页面的上方
		publicPath: config.dev.assetsPublicPath,
		proxy: config.dev.proxyTable,
		// 如果你有单独的后端开发服务器API，并且希望在同域名下发送API请求，那么代理某些URL将很有用.简称就是API代理,中间件  需引入 http-proxy-middleware
		quiet: true, // necessary for FriendlyErrorsPlugin
		watchOptions: {
			poll: config.dev.poll,
		}
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': require('../config/dev.env')
		}),
		new webpack.HotModuleReplacementPlugin(),   // 永远不能用在生产模式，模块热更新,修改文件的内容，允许在运行时更新各种模块，而无需进行完全刷新。
		new webpack.NamedModulesPlugin(), // 当进行热更新时，相关文件名会被展示出来
		new webpack.NoEmitOnErrorsPlugin(),  // webpack编译过程中出错的时候跳过报错阶段，不会阻塞编译，在编译结束后报错
		// https://github.com/ampedandwired/html-webpack-plugin
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
			inject: true
		}),
		// copy custom static assets
		// new CopyWebpackPlugin([
		// 	{
		// 		from: path.resolve(__dirname, '../static'),
		// 		to: config.dev.assetsSubDirectory,
		// 		ignore: ['.*']
		// 	}
		// ])
	]
})

function getLocalIps() {
    var os = require('os');
    var interfaces = os.networkInterfaces();
    var addresses = [];
    for (var k in interfaces) {
        for (var k2 in interfaces[k]) {
            var address = interfaces[k][k2];
            if (address.family === 'IPv4' && !address.internal) {
                addresses.push(address.address);
            }
        }
    }
    return addresses;
}
module.exports = new Promise((resolve, reject) => {
	portfinder.basePort = process.env.PORT || config.dev.port
	//由于portfinder这个插件本身是从8000开始查找，这里设置查找的默认端口号
	portfinder.getPort((err, port) => {
		if (err) {
			reject(err)
		} else {
			// publish the new Port, necessary for e2e tests
			process.env.PORT = port
			// 如果端口被占用就对进程设置端口
			// add port to devServer config
			devWebpackConfig.devServer.port = port
			// 如果端口被占用就设置devServer的端口
			// Add FriendlyErrorsPlugin
			devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
				compilationSuccessInfo: {
					messages: [`Your application is running here: http://${HOST}:${port}`],
				},
				// 添加提示信息，所在域名和端口的
				onErrors: config.dev.notifyOnErrors
				? utils.createNotifierCallback()
				: undefined
			}))

			resolve(devWebpackConfig)
			// 如果找到能用的端口号，就把配置信息提示抛出去
		}
	})
})
