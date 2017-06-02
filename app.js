var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var Animate = require('./models/animate')
var _ = require('underscore');
var port = process.argv[2] || 3000;
var app = express();

mongoose.connect('mongodb://localhost/yimodo')

app.set('views', './views/pages');
app.set('view engine', 'jade');
app.use(require('body-parser').urlencoded({extend:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.locals.moment = require('moment')

app.listen(port);

console.log('yimodo server started on port:' + port + '...');


// index page 
app.get('/', function (req, res) {
	Animate.fetch(function (err, animates) {
		if (err){
			console.log(err);
		}

		res.render('index', {
			title: 'いもうと home page',
			animates: animates
		})
	})
})


// detail page 
app.get('/animate/:id', function (req, res) {
	var id = req.params.id;

	Animate.findById(id, function (err, animate) {
		res.render('detail', {
			title: 'いもうと detal page',
			animate: animate
		})
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

// admin update animate
app.get('/admin/update/:id', function (req, res) {
	var id = req.params.id;

	if (id) {
		Animate.findById(id, function (err, animate) {
			res.render('admin', {
				title: 'いもうと admin animate update page',
				animate: animate
			})
		})
	}
})

// admin post animate
app.post('/admin/animate/new', function (req, res) {
	var id = req.body.animate._id;
	var animateObj = req.body.animate;
	var _animate

	if (id !== 'undefined') {
		Animate.findById(id, function (err, animate) {
			if (err) {
				console.log(err);
			}

			_animate = _.extend(animate, animateObj);
			_animate.save(function (err, animate) {
				if (err) {
					console.log(err);
				}
			})

			res.redirect('/animate/' + animate._id)
		})
	}
	else {
		_animate = new Animate({
			title_CN: animateObj.title_CN,
			title_OG: animateObj.title_OG,
			director: animateObj.director,
			country: animateObj.country,
			year: animateObj.year,
			type: animateObj.type,
			parts: animateObj.parts,
			poster: animateObj.poster,
			flash: animateObj.flash,
			summary: animateObj.summary
		})

		_animate.save(function (err, animate) {
			if (err) {
				console.log(err);
			}

			res.redirect('/animate/' + animate._id);
		})
	}
})


// admin list page 
app.get('/admin/list', function (req, res) {
	Animate.fetch(function (err, animate) {
		if (err) {
			console.log(err);
		}

		res.render('list', {
			title: 'いもうと admin list page',
			animates: animate
		})
	})
})


// list delete movie
app.delete('/admin/list', function (req, res) {
	var id = req.query.id;

	if (id) {
		Animate.remove({_id: id}, function (err, animate) {
			if (err) {
				console.log(err);
			}
			else {
				res.json({success: 1})
			}
		})
	}
})
