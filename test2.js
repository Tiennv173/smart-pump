var MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser'); //parse cac request den server
var fs = require('fs');
var fetch = require('node-fetch');
const path = require('path');



var express = require('express');
var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// sets view forlder
// app.set('views', path.join(__dirname, 'views'));

//sets view engine
// app.set('view engine', 'ejs');

const port = process.env.PORT || 3000;

var aData = null;  
var aDocs = null;

var url = "mongodb://tiennguyen.koreasouth.cloudapp.azure.com:27017/";


// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("device");
//   dbo.collection("data").find({}).limit(25).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     aDocs = result;
//     db.close();
//   });

//   var server = app.listen(3000, function () {
// 	var port = server.address().port;
// 	console.log('Example app listening at http://localhost:%s', port);
// });
// });

// Display `index.html` when `localhost:3000` is requested


app.get('/', function (req, res) {
//connect DB
	MongoClient.connect(url,function(err, db){
		if(err) throw err;
		const dbo = db.db("device");
		const col = dbo.collection('data');
		col.find({}).toArray().then(docs => {
			console.log('found data for index');
			// console.log(docs);
			//res index.html 
			// res.send(docs)
			// console.log(typeof docs);
			res.json(docs);
			// console.log(docs);

			//closes connection to mongodb and logs massage
			db.close(() => console.log("connection closed"));
		})
	})

  // res.sendFile('index.html',{root: './'});
});

//Send data
app.get('/send', function (req, res) {
//connect DB
	MongoClient.connect(url,function(err, db){
		if(err) throw err;
		const dbo = db.db("device");
		const col = dbo.collection('data');
		col.find({}).toArray().then(docs => {
			console.log('found data for index');
			// console.log(docs);
			//res index.html 
			// res.send(docs)
			// console.log(typeof docs);
			res.render('index', {
				data: docs
			});
			// console.log(docs);

			//closes connection to mongodb and logs massage
			db.close(() => console.log("connection closed"));
		})
	})

  // res.sendFile('index.html',{root: './'});
});

// Send all records when there's a GET request to `localhost:3000/test`
app.get('/dashboard', function (req, res) {
	res.sendFile('demoZingchart.html',{root: './'})
});

app.get('/index2', function (req, res) {
	res.sendFile('index21.html',{root: './'})
});

//demoZingchart
app.get('/demoZingchart', function (req, res) {
	res.render('demoChart')
});


app.listen(port, () => console.log(`listening on ${port}`));

// fetch('http://localhost/')
// .then(function(response){
//     return response.json();
// })
// .then(function(json){
//     console.log(json);
// });


