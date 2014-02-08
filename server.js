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
people.push( [ [0,3] , [10,2] , [20,5] , [30,8] , [50,2] ])
people.push( [ [0,4] , [10,5] , [20,12] , [30,3] , [50,7] ])
people.push( [ [0,3] , [10,19] , [20,5]  , [30,10] , [50,10] ])
people.push( [ [0,2] , [20,18]  , [30,5] , [30, 10] , [50,3] ])

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
