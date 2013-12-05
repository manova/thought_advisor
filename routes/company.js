/*
 * Company related requests
 */
 var db = require('mongoskin').db('localhost:27017/thoughtadvisor'),
 companies = db.collection('companies');

 company_names = exports.company_names = function company_names(req, res){
 res.writeHead(200, {'Access-Control-Allow-Origin': '*'/*, "Content-Type": "application/json"*/});
 console.log("params: ", req.param('blah'));
 var arr = req.param('urls');
 if (typeof arr !== 'undefined'){ companies.find({url:{$in:arr}}, {name:1, url:1, _id:0}).toArray(function (e, result) {
  if (e) throw(e);
  res.end(JSON.stringify(result));
});}
};

company = exports.company = function(req, res){
  res.writeHead(200, {'Access-Control-Allow-Origin': '*', "Content-Type": "application/json"});
  db.collection('companies').findOne({name:req.param('name')}, function (e, result) {
    if (e) throw(e);
    res.end(JSON.stringify(result));
  });
};

urls = exports.urls = function(req, res){
res.writeHead(200, {'Access-Control-Allow-Origin': '*'/*, "Content-Type": "application/json"*/});
db.collection('companies').find({}, {url:1, _id:0}).toArray(function (e, result) {
  if (e) throw(e);
  res.end(JSON.stringify(result));
});
};