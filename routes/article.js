var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'simpleblog');

var articleSchema = mongoose.Schema({ 
	title: 'string',
	body: 'string'
});
var Article = db.model('Cat', articleSchema);

exports.index = function(req, res) {
	Article.find({}, function(err, result) {
		res.render('article/index', {articles : result})
	})
}

exports.new_resource = function(req, res) {
  res.render('article/new', {title : "Create a new article"})
}

exports.create = function(req, res) {
	var article = new Article({
		title : req.param('title'),
		body : req.param('body')
	});
	
	article.save(function(err){
		if (!err)
			res.redirect('/articles')
		else
			res.end('cannot create the article')
	});
}

exports.show = function(req, res) {
	Article.findById(req.param('id'), function(err, result) {
		if (!err) {
			res.render('article/show', {
				article : {
					title : result.title,
					body: result.body,
					id: result._id
				}
			})
		}else {
			res.end('cannot find an article with id = ' + req.param('id'));
		}
	});
}

exports.edit = function(req, res) {
		Article.findById(req.param('id'), function(err, result) {
		if (!err) {
			res.render('article/edit', {
				title : "Editing Article",
				article : {
					title : result.title,
					body: result.body,
				}
			})
		}else {
			res.end('cannot find an article with id = ' + req.param('id'));
		}
	});
}


exports.update = function(req, res ) {
	Article.findById(req.param('id'), function(err, result) {
		if (!err) {
			result.title = req.param('title');
			result.body = req.param('body');
			result.save(function(err) {
				if (!err)
					res.redirect('/articles/' + req.param('id'));
				else
					res.end('cannot update article');
			});
		}else {
			res.end('cannot find an article with id = ' + req.param('id'));
		}
	});
}
