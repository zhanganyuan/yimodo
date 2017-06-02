var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var port = process.argv[2] || 3000;
var app = express();

mongoose.connect('mongodb://localhost/imooc')

app.set('views', './views/pages');
app.set('view engine', 'jade');
app.use(require('body-parser').urlencoded({extend:true}));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.listen(port);

console.log('yimodo server started on port:' + port + '...');


// index page 
app.get('/', function (req, res) {
	res.render('index', {
		title: 'いもうと home page',
		animates: [{
			title_CN: '缘之空',
			_id: 1,
			poster: 'https://github.com/zhanganyuan/yimodo/blob/master/poster.jpg',
		},{
			title_CN: '缘之空',
			_id: 2,
			poster: 'https://github.com/zhanganyuan/yimodo/blob/master/poster.jpg',
		},{
			title_CN: '缘之空',
			_id: 3,
			poster: 'https://github.com/zhanganyuan/yimodo/blob/master/poster.jpg',
		},{
			title_CN: '缘之空',
			_id: 4,
			poster: 'https://github.com/zhanganyuan/yimodo/blob/master/poster.jpg',
		}]
	})
})


// detail page 
app.get('/animate/:id', function (req, res) {
	res.render('detail', {
		title: 'いもうと detal page',
		animate: {
			title_CN: '缘之空',
			title_OG: 'ヨスガノソラ',
			director: '高桥丈夫',
			country: '日本',
			tear: 2010,
			type: '兄妹恋',
			parts: 12,
			summary: '主角春日野悠和他的双胞胎妹妹穹在父母死于事故之后，来到了位于名叫奥木染的小村的祖父的家中，在那里开始新的生活。一边和不习惯的家务事奋战，一边还要照顾平时足不出户、什么事情都不会的妹妹穹，悠的生活变得异常艰辛。'
		}
	})
})


// admin page 
app.get('/admin/animate', function (req, res) {
	res.render('admin', {
		title: 'いもうと admin animate page',
		animate: {
			title_CN: '',
			title_OG: '',
			director: '',
			country: '',
			year: '',
			type: '',
			parts: '',
			poster: '',
			flash: '',
			summary: ''
		}
	})
})


// admin list page 
app.get('/admin/list', function (req, res) {
	res.render('list', {
		title: 'いもうと admin list page',
		animates: [{
			_id: 1,
			title_CN: '缘之空',
			title_OG: 'ヨスガノソラ',
			director: '高桥丈夫',
			country: '日本',
			tear: 2010,
			type: '兄妹恋',
			parts: 12,
			flash: '',
			summary: '主角春日野悠和他的双胞胎妹妹穹在父母死于事故之后，来到了位于名叫奥木染的小村的祖父的家中，在那里开始新的生活。一边和不习惯的家务事奋战，一边还要照顾平时足不出户、什么事情都不会的妹妹穹，悠的生活变得异常艰辛。'
		}]

	})
})