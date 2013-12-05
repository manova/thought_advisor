var db = require('mongoskin').db('localhost:27017/thoughtadvisor'),
companies = db.collection('companies'),
faker = require('../public/scripts/Faker'), _und = require("underscore");

//app.use(express.bodyParser());

company_form = exports.company_form = function (req, res) {
  res.render('add_company', { title: 'Admin' });
};

// This function currently looks ugly but I know there has to be a better way to do this.
// to be explored in the future
add_company = exports.add_company = function (req, res) {
  var name  = '', url = '', city = '', state = '', country = '', zip_code = '',
  twitter = '', linkedin = '', blog = '', address_street_1='', address_street_2='',
  poc_contact_email = '', poc_contact_number_1 = '', poc_contact_number_2  = '',
  industries = [], services = [], size = 0, geography = [], poc_last_name = '', description = '';

  //load available data
  if (req.param('name')!==undefined){
    name = req.body.name;
  }
  if (req.param('twitter')!==undefined){
    twitter = req.body.twitter;
  }
  if (req.param('url')!==undefined){
    url = req.body.url;
  }
  if (req.param('blog')!==undefined){
    blog = req.body.blog;
  }
  if (req.param('city')!==undefined){
    city = req.body.city;
  }
  if (req.param('linkedin')!==undefined){
    linkedin = req.body.linkedin;
  }
  if (req.param('state')!==undefined){
    state = req.body.state;
  }
  if (req.param('country')!==undefined){
    country = req.body.country;
  }
  if (req.param('zip_code')!==undefined){
    zip_code = req.body.zip_code;
  }
  if (req.param('description')!==undefined){
    description= req.body.description;
  }
  if (req.param('address_street_1')!==undefined){
    address_street_1 = req.body.address_street_1;
  }
  if (req.param('address_street_2')!==undefined){
    address_street_2 = req.body.address_street_2;
  }
  if (req.param('size')!==undefined){
    size = req.body.size;
  }
  if (req.param('poc_contact_number_1')!==undefined){
    poc_contact_number_1 = req.body.poc_contact_number_1;
  }
  if (req.param('poc_contact_number_2')!==undefined){
    poc_contact_number_2 = req.body.poc_contact_number_2;
  }
  if (req.param('poc_contact_email')!==undefined){
    poc_contact_email = req.body.poc_contact_email;
  }
  if (req.param('poc_last_name')!==undefined){
    poc_last_name = req.body.poc_last_name;
  }
  if (req.param('poc_first_name')!==undefined){
    poc_first_name = req.body.poc_first_name;
  }
  if (req.param('industries')!==undefined){
    industries = req.body.industries.split(',');
  }
  if (req.param('geography')!==undefined){
    geography = req.body.geography.split(',');
  }
  if (req.param('services')!==undefined){
    services = req.body.services.split(',');
  }
  companies.update({name:name}, {$set:{url:url,poc_contact_number_1:poc_contact_number_1,
    poc_contact_number_2:poc_contact_number_2, poc_first_name:poc_first_name,
    poc_last_name:poc_last_name, poc_contact_email:poc_contact_email, industries:industries,
    services:services, size:size, geography:geography, address_street_1:address_street_1,
    address_street_2:address_street_2, city:city, state:state, country:country,
    zip_code:zip_code, twitter:twitter, linkedin:linkedin, blog:blog, description:description}},
    {upsert:true});
  res.end('Data Updated!');
};