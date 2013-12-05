// This is a helper function to bootstrap the initial company data in mongo.
// But this can be done from the recently added admin ui now.
var db = require('mongoskin').db('localhost:27017/thoughtadvisor'),
	Faker = require('./public/scripts/Faker');

var companies = db.collection('companies');

var company_data = [{name:'Efficio Consulting', url:'www.efficioconsulting.com',
description:'Efficio is a high calibre international consulting firm that helps its clients to deliver transformational procurement programmes. We attain measurable and sustainable results by driving strategic sourcing programmes while in parallel implementing and embedding procurement organisation, people and process changes. With a long track record of delivery and a results-focused culture, we are able to seamlessly integrate with your people and operate with integrity and transparency to deliver your project and create substantial cost reductions.',
poc_contact_number_1:'00 44 20 7550 5677',
poc_contact_number_2:'+1 972.628.6827',
poc_first_name:'Gerardo',
poc_last_name:'Corbal',
poc_contact_email:'georgina.golding@efficioconsulting.com',
industries:['Technology', 'Strategy', 'Human Resources'],
services:['Procurement Opportunity Assessment', 'Strategic Sourcing Execution', 'People & Process Development', 'Procurement Transformation', 'Managed Procurement Services'],
size:800,
geography:['North America', 'Europe'],
address_street_1:'22 Long Acre',
address_street_2: '',
city:'London',
state:'',
country:'UK',
zip_code:'WC2E 9LY',
twitter:'http://www.twitter.com/buckconsultants',
linkedin:'https://www.linkedin.com/company/buck-consultants?trk=hb_tab_compy_id_7992',
blog:'http://blog.buckconsultants.com/'},
{name: 'Buck Consultants', url: 'www.buckconsultants.com',
description: 'Buck Consultants is a global HR consulting firm that helps organizations develop, deploy, and manage their workforce. We provide real-world solutions to our clients’ complex HR and business challenges.',
poc_contact_number_1:'+1 866.355.6647',
poc_contact_number_2:'+1 972.628.6827',
poc_first_name:'Anne-Marie',
poc_last_name:'Kearny',
poc_contact_email:'anne-marie.kearney@buckconsultants.com',
industries:['Health', 'Investment', 'Technology'],
services:['Communication', 'Compensation', 'Global Consulting and Strategy', 'Global Investment Advisors', 'Global Technology and Delivery Solutions', 'Health and Productivity', 'Retirement', 'Talent and HR Solutions' ],
size: 1200,
geography:['North America', 'Europe', 'APAC', 'Africa', 'Latin America'],
address_street_1:'1801 Century Park East',
address_street_2: 'Suite 500',
city:'Los Angeles',
state:'CA',
country:'USA',
zip_code:'90067',
twitter:'http://www.twitter.com/buckconsultants',
linkedin:'https://www.linkedin.com/company/buck-consultants?trk=hb_tab_compy_id_7992',
blog:'http://blog.buckconsultants.com/'
},
{name: 'Deloitte', url: 'www.deloitte.com',
description: 'In the United States, Deloitte LLP and its subsidiaries have 57,000 professionals with a single focus: serving our clients and helping them solve their toughest problems. We work in four key business areas — audit, financial advisory, tax and consulting — but our real strength comes from combining the talents of those groups to address clients’ needs. Fortune and BusinessWeek consistently rank our organization among the best places to work, which is good news for our talent and our clients alike. When the best people tackle the most compelling challenges, everyone wins.',
poc_contact_number_1:'+1 866.355.6647',
poc_contact_number_2:'+1 972.628.6827',
poc_first_name:'Anne-Marie',
poc_last_name:'Kearny',
poc_contact_email:'anne-marie.kearney@buckconsultants.com',
industries:['Health', 'Investment', 'Technology'],
services:['Communication', 'Compensation', 'Global Consulting and Strategy', 'Global Investment Advisors', 'Global Technology and Delivery Solutions', 'Health and Productivity', 'Retirement', 'Talent and HR Solutions' ],
size: 1200,
geography:['North America', 'Europe', 'APAC', 'Africa', 'Latin America'],
address_street_1:'1801 Century Park East',
address_street_2: 'Suite 500',
city:'Los Angeles',
state:'CA',
country:'USA',
zip_code:'90067',
twitter:'http://www.twitter.com/buckconsultants',
linkedin:'https://www.linkedin.com/company/buck-consultants?trk=hb_tab_compy_id_7992',
blog:'http://blog.buckconsultants.com/'
},
{name: 'FTI Consulting', url: 'www.fticonsulting.com',
description: 'FTI Consulting is a global business advisory firm that provides multidisciplinary solutions to complex challenges and opportunities. With the full power of unique depth of thought combined with the global expertise of leading professionals, we are committed to protecting and enhancing the enterprise value of our clients.',
poc_contact_number_1:'+1 866.355.6647',
poc_contact_number_2:'+1 972.628.6827',
poc_first_name:'Anne-Marie',
poc_last_name:'Kearny',
poc_contact_email:'anne-marie.kearney@buckconsultants.com',
industries:['Health', 'Investment', 'Technology'],
services:['Communication', 'Compensation', 'Global Consulting and Strategy', 'Global Investment Advisors', 'Global Technology and Delivery Solutions', 'Health and Productivity', 'Retirement', 'Talent and HR Solutions' ],
size: 1200,
geography:['North America', 'Europe', 'APAC', 'Africa', 'Latin America'],
address_street_1:'1801 Century Park East',
address_street_2: 'Suite 500',
city:'Los Angeles',
state:'CA',
country:'USA',
zip_code:'90067',
twitter:'http://www.twitter.com/buckconsultants',
linkedin:'https://www.linkedin.com/company/buck-consultants?trk=hb_tab_compy_id_7992',
blog:'http://blog.buckconsultants.com/'
}];


//console.log("generated: ", Faker.Name.findName());

for (var i = 0; i < company_data.length; i++){
	var company = company_data[i]
	companies.insert(company, function(err) {
		if(err) {
			return console.log('insert error', err);
		}
		console.log('inserted company: ', company);
	});
}


// var arr = ['www.efficioconsulting.com', 'www.buckconsultants.com'];
// companies.find({url:{$in:arr}}).toArray(function (e, result) {
// 	if (e) throw(e);
// 	console.log(result);
// });