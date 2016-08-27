var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var apiAI = require('apiai');
var api = apiAI('e5e584257d164eab95ffd6038c9f56f7');

// Routes
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	socket.on('chat message', function(msg){
		io.emit('chat message', "YOU: " + msg);

		var request = api.textRequest(msg);
		request.on('response', function(response) {
			result = response.result.fulfillment.speech;
			io.emit('chat message', "BOT: " + result);
		});
		request.on('error', function(error) {
			console.log(error);
		});
		request.end();

	});
	console.log('LOG: user connected');
	socket.on('disconnect', function(){
		console.log('LOG: user disconnected');
	});
});

http.listen(3000, function(){
	console.log('LOG: listening on port 3000');
});
