const path = require('path')

module.exports = {
	dev : {
		assetsPublicPath : '/',
		host : '127.0.0.8',
		port : '8081',
		proxyTable : {
			
		}
	},
	build : {
		assetsRoot : path.resolve(__dirname,'../dist'),
		assetsPublicPath : './'
	}
}