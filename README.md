# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

## webpack多页面脚手架
- 详情可以查看此文章
  - https://bryanadamss.github.io/2018/01/02/webpack-multi-page/
  
  
## 添加模拟请求 ##

	this.app.get(/^(\/api\/)([A-Za-z0-9]*)/, (req, res) => {
	var regExp = /^(\/api\/)([A-Za-z0-9]*)/;
	var appData = require('../../../false_data/' + regExp.exec(req.path)[2] + '.json'); //3.加载本地数据文件
	setTimeout(function(){
		res.json(appData)
	},200);
  });
  
  this.app.post(/^(\/api\/)([A-Za-z0-9]*)/, (req, res) => {
	var regExp = /^(\/api\/)([A-Za-z0-9]*)/;
	var appData = require('../../../false_data/' + regExp.exec(req.path)[2] + '.json'); //3.加载本地数据文件
	setTimeout(function(){
		res.json(appData)
	},200);
  });

添加内容到 \node_modules\_webpack-dev-server@3.7.2@webpack-dev-server\lib\Server.js