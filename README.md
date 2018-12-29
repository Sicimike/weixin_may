个人微信小程序

## 环境参数
* 基础库：2.4.3
* IDE：微信开发者工具v1.02 + vscode  

## 项目介绍
个人小程序，采用了组件化编程思想，包括三个主页面：  
* 流行，主要发布一些期刊，包括音乐、图片、诗句等，用户可以给自己喜欢的期刊点赞
* 书籍，用户可以浏览、搜索书籍、查看书籍信息等
* 喜欢，主要集中用户点赞的内容  

## 项目后台源码地址
`https://github.com/Sicimike/may-server`

## 注意事项
* project.config.json中appid记得替换为自己小程序的appid
* config.js中api_base_url替换成自己服务器的ip和端口
* config.js中appKey为作者自定义的md5串，用于请求后台时校验请求合法性，可以修改，但是后台项目配置文件application.properties中weixin.appKey必须和此处保持一致  
