var express = require('express'),
    app = express(),
    path = require('path'),
    fs = require('fs'),
    multer  = require('multer'),
    upload = multer({ dest: 'uploads/' }),
    YouTube = require('youtube-node'),
    youTube = new YouTube();

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

youTube.setKey('API-KEY-HERE');
// Returns a youtube ID, e.g. `{"videoId":"UuxTn5vC8VM"}` 
app.get('/search/:key', function(req, res) {
    var key = req.params.key;
    youTube.search(key, 1, function(error, result) {
        if (error) {
            console.log(error);
        }
        else {
            var videoId = null;
            if (result.items.length > 0) {
                videoId = result.items[0].id.videoId;
            }
            res.json({videoId: videoId});
        }
    });
});

// Load static files
app.use('/js', express.static('js'));
app.use('/img', express.static('img'));
app.use('/css', express.static('css'));
app.use('/fonts', express.static('fonts'));

// Start the server at port 3000
var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Listening on localhost:' + port);
});
