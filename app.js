var express = require('express');
var path = require('path');
var ejs = require('ejs');

var app = express();
app.use(express.static('public')); // set up the public directory as web accessible
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.send(500, 'Something broke!');
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('main.ejs',{ });
})

app.get('/curtain', function (req, res) {
  res.render('curtain.ejs',{ });
})

var http = require('http');

var webserver = app.listen(9111, function () {
  console.log('Webserver listening at http://' + webserver.address().address + ':' + webserver.address().port);

});


module.exports = app;
