
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , article = require('./routes/article')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.resource = function(path, obj) {
  this.get(path, obj.index);
  this.get(path + '/new', obj.new_resource)
  this.get(path + '/:id', obj.show);
  this.post(path + '/:id', obj.destroy);
  this.post(path+ '/', obj.create);
  this.post(path + '/:id', obj.update);
  this.get(path + '/:id/edit', obj.edit)
};
app.resource('/articles',article );
app.get('/', routes.index);
app.get('/users', user.list);



http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
