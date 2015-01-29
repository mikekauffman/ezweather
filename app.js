var express = require('express');
var app = express();
var hbs = require('hbs');
var WunderNodeClient = require("wundernode");
var dotenv = require('dotenv');
dotenv.load();
var apikey = process.env.WUKEY;

var debug = false;
var wunder = new WunderNodeClient(apikey, debug,  10, 'minute');
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.listen(process.env.PORT || 3000);
app.set('view engine', 'html');
app.engine('html', hbs.__express);

app.get('/', function(req, res) {
  res.render('index');
});

app.post('/forecast', function(req, res) {
  var query = req.body.zip;

  wunder.conditions(query, function(err, obj) {
    if (err){
      console.log('errors: ' + err);
      res.end("Error processing query string:" + queryData.query);
    }
    response = JSON.parse(obj);
    res.render('index', {response: response.current_observation });
  });
});

