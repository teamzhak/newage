var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var apiAI = require('apiai');
var api = apiAI('f9acff6103814cf4a834f36232bb78d3');
<<<<<<< HEAD
var bodyParser = require('body-parser');
=======
var Pusher = require('pusher');
>>>>>>> origin/master
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var router = app.Router();

var chatRoom = 1;

// Routes
router.get('/chat', function(req, res){
	res.json({ chatroom: chatRoom });
});

<<<<<<< HEAD
app.use('/api', router);

//app.get('/', function(req, res){
//	res.render(__dirname + '/index.ejs', {
//		chatRoom: chatRoom
//	});
//	chatRoom = chatRoom + 1;
//});
=======
//

>>>>>>> origin/master

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
