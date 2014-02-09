// Helper functions
function contains(array, object) {
    return (array.indexOf(object) != -1);
}

// Server of /pub folder
var express = require('express');
var app = express();
var bloomberg = require('./bloomberg.js')

app.use(function(req, res, next) {
  console.log(req.method + ' ' + req.url);
  next();
});

app.listen(8765);

app.use('/', express.static(__dirname + '/'));

var symbols = ['GE']//['KO','NDLS','MSFT']
var data
app.get('/stocks', function(req, res) {
	if(!data) {
		var stockNames = []
		symbols.forEach(function(item) {
			stockNames.push(item + ' US Equity')
		})
		bloomberg.magic(stockNames, function(array) {
			data = array
			res.json(data)
		})
	}
	else {
		res.json(data)
	}	
})

// Call /stocks at least once before calling this method
app.get('/addSymbol', function(req,res) {
	var newSymbol = req.query.symbol || 'AAPL'
	if(!contains(symbols, newSymbol)) {
		var newStockName = newSymbol + ' US Equity'
		bloomberg.magic([newStockName], function(array) {
			if(array && array[0].name) {			
				symbols.push(newSymbol)
				data = data.concat(array)
				res.json(data)
			}
			else {
				console.log('Couldnt find stock')
				res.send(404)
			}
		})
	}
	else {
		res.json(data)
	}
})

app.get('/reset', function(req,res) {
	data = null;
	symbols = symbols.slice(0,1)
	res.send('OK')
})

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
