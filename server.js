var express = require('express'),
    app = express(),
    path = require('path'),
    fs = require('fs'),
    multer  = require('multer'),
    upload = multer({ dest: 'uploads/' });

// First page shows the index page
app.get('/', function(req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, './') });
});

// Response to identify
app.post('/identify', upload.single('audio'), function(req, res, next) {
    var apiKey = 'API-KEY-HERE',
        shazam = require('shazamapi-node')(apiKey);

    var songPath = req.file.path;

    shazam.identify(songPath)
        .then((response) => {
            res.json(response);
        })
        .then(() => {
            // delete file after matching similar songs
            fs.unlink(songPath);
        });
});

// Load static files
app.use('/js', express.static('js'));

// Start the server at port 3000
app.listen(3000, function() {
    console.log('Listening on localhost:3000');
});

// Dependencies
// express, multre, shazamapi-node
