
/**
 * Module dependencies.
 */

 var express = require('express'),
 routes = require('./routes'),
 companyRoutes = require('./routes/company'),
 adminRoutes = require('./routes/admin'),
 http = require('http'),
 path = require('path'),
 db = require('mongoskin').db('localhost:27017/thoughtadvisor'),
 db2 = require('mongoskin').db('localhost:27017/movies'),
 movies = db2.collection('movies');

 var app = express();

 app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon(__dirname + '/public/images/favicon.ico', { maxAge: 2592000000 }));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.directory(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname, 'public')));

});

 app.configure('development', function(){
  app.use(express.errorHandler());
});

 app.get('/', function(req, res){
  res.render('index_solr', {title: "ThoughtAdvisor"});
});

 app.get('/company', companyRoutes.company);

 app.get('/company_names', companyRoutes.company_names);

 app.get('/urls', companyRoutes.urls);

 app.post('/add_company', adminRoutes.add_company);

 app.get('/company_form', adminRoutes.company_form);

 http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

