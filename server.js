// Server of /pub folder
var express = require('express');
var app = express();

app.use(function(req, res, next) {
  console.log(req.method + ' ' + req.url);
  next();
});

app.listen(8000);

app.use('/static', express.static(__dirname + '/'));



app.get('*', function(req, res){
  	res.send(404,'nothing here');
});
