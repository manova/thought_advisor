
/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),a
  user = require('./routes/user'),
  http = require('http'),
  path = require('path'),
  db = require('mongoskin').db('localhost:27017/thoughtadvisor'),
  companies = db.collection('companies');

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
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res){
  res.render('index', {
    title: 'Home'
  });
});

app.get('/about', function(req, res){
  res.render('about', {
    title: 'About'
  });
});

app.get('/contact', function(req, res){
  res.render('contact', {
    title: 'Contact'
  });
});

app.get('/company', function(req, res){
  res.writeHead(200, {'Access-Control-Allow-Origin': '*', "Content-Type": "application/json"});
  db.collection('companies').findOne({name:req.query.name}, function (e, result) {
    if (e) throw(e);
    res.end(JSON.stringify(result));
  });
});

app.get('/company_names', function(req, res){
  res.writeHead(200, {'Access-Control-Allow-Origin': '*'/*, "Content-Type": "application/json"*/});
  console.log("query: ", req.query.urls);
  var arr = req.query.urls;
  companies.find({url:{$in:arr}}, {name:1, url:1, _id:0}).toArray(function (e, result) {
    if (e) throw(e);
    res.end(JSON.stringify(result));
  });
});

app.get('/urls', function(req, res){
  res.writeHead(200, {'Access-Control-Allow-Origin': '*'/*, "Content-Type": "application/json"*/});
  db.collection('companies').find({}, {url:1, _id:0}).toArray(function (e, result) {
    if (e) throw(e);
    res.end(JSON.stringify(result));
  });
});

app.get('/solr', function(req, res){
  res.render('index_solr', {title: "ThoughtAdvisor"});
});

app.get('/solr2', function(req, res){
  res.render('index_solr2', {title: "ThoughtAdvisor"});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

