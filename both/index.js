var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var apiAI = require('apiai');
var api = apiAI('e5e584257d164eab95ffd6038c9f56f7');
//var bodyParser = require('body-parser');
app.set('view engine', 'ejs');


var chatRoom = 1;

// Routes
//router.get('/chat', function(req, res){
//	res.json({ chatroom: chatRoom });
//});

//app.use('/api', router);

//app.get('/', function(req, res){
//	res.render(__dirname + '/index.ejs', {
//		chatRoom: chatRoom
//	});
//	chatRoom = chatRoom + 1;
//});

io.on('connection', function(socket){

	socket.on('new', function(room){
		socket.join(chatRoom);
		console.log('join new chatroom.')
	});

	socket.on('send', function(data){
		io.to(data.room).emit('message', data);

		var request = api.textRequest(data.message);
		request.on('response', function(response) {
			result = {message: response.result.fulfillment.speech};
			io.to(data.room).emit('message', result);
		});
		request.on('error', function(error) {
			console.log(error);
		});
		request.end();

		console.log('sending message to' + data.room + ' || '+ data.message)
	});

});


http.listen(3000, function(){
	console.log('LOG: listening on port 3000');
});
