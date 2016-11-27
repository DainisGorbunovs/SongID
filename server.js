var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    path = require('path');

// First page shows the index page
app.get('/', function(req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, './') });
});

app.use('/js', express.static('js'));

// Read websockets
// io.on('connection', function(socket){
//     console.log('a user connected');
// });

// Start the server at port 3000
http.listen(3000, function() {
    console.log('Listening on localhost:3000');
});

//socket-io
//express