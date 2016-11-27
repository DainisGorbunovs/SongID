var express = require('express'),
    app = express(),
    path = require('path');

// First page shows the index page
app.get('/', function(req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, './') });
});

// Response to identify
app.post('/identify', function(req, res) {
    res.json({
        "matches":[
            {
                "key":"Xz5UTjcmsakF4B+JtayphlNUiqIj8haFFz5DeUiJhdZ2V963xMHdpjHxK7QmtUEUEA==",
                "metadata":{
                    "title":"Invincible",
                    "artist":"Deaf Kev"
                },
                "type":"music"
            }
        ]
    });
});

// Load static files
app.use('/js', express.static('js'));

// Start the server at port 3000
app.listen(3000, function() {
    console.log('Listening on localhost:3000');
});

// Dependencies
// express