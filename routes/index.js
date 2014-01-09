
/*
 * GET home page.
 */
var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');

exports.update = function (req, res) {
	Todo.findById (req.params.id, function (err, todo) {
		todo.content = req.body.content;
		todo.update_date = Date.now();
		todo.save(function (err, todo, count) {
			res.redirect('/');
		});
	});
};

exports.edit = function (req, res) {
	Todo.find().sort('-update_date').exec( function (err, todos) {
		res.render('edit', {
			title : "Express Todo Example Edit",
			todos : todos,
			current: req.params.id
		})
	});
};

exports.destroy = function (req, res) {
	console.log(req.params.id);
	Todo.findById( req.params.id, function (err, todo) {
		todo.remove( function (err, todo) {
			res.redirect('/');
		});
	});
};

exports.create = function (req, res) {
	new Todo ({
		content : req.body.content,
		update_date : Date.now()
	}).save( function (err, todo, count) {
		res.redirect('/');
	});
};

exports.index = function(req, res){
	var template_engine = req.app.settings.template_engine;
	res.locals.session = req.session;
  Todo.find().sort('-update_date').exec( function (err, todos, count) {
  	res.render('index', {title: 'Express with' + template_engine,
  						 todos: todos});
  });
  //res.render('index', { title: 'Express with '+template_engine });
};
