// Server of /pub folder
var express = require('express');
var app = express();

app.use(function(req, res, next) {
  console.log(req.method + ' ' + req.url);
  next();
});

app.listen(8000);

app.use('/static', express.static(__dirname + '/'));

var people = []
people.push( [ [10,50] , [20,70] , [30,60] , [50,60] ])
people.push( [ [10,30] , [20,40] , [30,70] , [50,60] ])
people.push( [ [10,20] , [20,0]  , [30,60] , [50,60] ])
people.push( [ [10,70] , [20,0]  , [30,80] , [50,60] ])

app.get('/coordinates', function(req, res) {
	var base = parseInt(req.query.base) || 0
	var basepoints = people[base]
	var newarray = []
	people.forEach( function(user, i) {
		newarray.push( [] )
		user.forEach( function(point, j) {
			newarray[i].push( [ point[0] , Math.abs(point[1] - basepoints[j][1]) ] )
		})
	})
	res.json(newarray)
})

app.get('*', function(req, res) {
  	res.send(404,'nothing here');
});
