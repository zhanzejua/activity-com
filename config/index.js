// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path')
module.exports = {
	dev: {

		// Paths
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',
		proxyTable: {},

		// Various Dev Server settings
		host: 'localhost', // can be overwritten by process.env.HOST
		// dev-server监听的端口
		port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
		// 是否自动打开浏览器
		autoOpenBrowser: false,
		errorOverlay: true,
		notifyOnErrors: true,
		poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

		
		/**
		 * Source Maps
		 */

		// https://webpack.js.org/configuration/devtool/#development
		devtool: 'cheap-module-eval-source-map',

		// If you have problems debugging vue-files in devtools,
		// set this to false - it *may* help
		// https://vue-loader.vuejs.org/en/options.html#cachebusting
		cacheBusting: true,

		cssSourceMap: true
	},

	build: {
		// Template for index.html
		index: path.resolve(__dirname, '../dist/index.html'),

		// Paths
		// 产品文件的存放路径
		assetsRoot: path.resolve(__dirname, '../dist'),
		// 二级目录，存放静态资源文件的目录，位于dist文件夹下
		assetsSubDirectory: 'static',
		assetsPublicPath: './', //todo:打包到线上的时候不需要.

		// Source Maps
		productionSourceMap: false,
		// https://webpack.js.org/configuration/devtool/#production
		devtool: '#source-map',

		// Gzip off by default as many popular static hosts such as
		// Surge or Netlify already gzip all static assets for you.
		// Before setting to `true`, make sure to:
		// npm install --save-dev compression-webpack-plugin
		productionGzip: false,
		// gzip模式下需要压缩的文件的扩展名，设置js、css之后就只会对js和css文件进行压缩
		productionGzipExtensions: ['js', 'css'],

		// Run the build command with an extra argument to
		// View the bundle analyzer report after build finishes:
		// `npm run build --report`
		// Set to `true` or `false` to always turn it on or off
		bundleAnalyzerReport: process.env.npm_config_report
	}
}
