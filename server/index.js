var app = require('express')();
var path = require('path');
var routes = require('./routes/index');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var apiAI = require('apiai');
var api = apiAI('e5e584257d164eab95ffd6038c9f56f7')
var firebase = require("firebase");

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDGnwGhGx4TCJ39bE-bHngwOZ6l3wZrHXA",
    authDomain: "newagemental.firebaseapp.com",
    databaseURL: "https://newagemental.firebaseio.com",
    storageBucket: "newagemental.appspot.com",
};
firebase.initializeApp(config);

const auth = firebase.auth();

// Routes
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.use('/', routes);

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


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

http.listen(3000, function(){
    console.log('LOG: listening on port 3000');
});

module.exports = app;
