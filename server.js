var express = require('express');
var app = express();
/// var router = require('./server/router');

//set port variable to deployed port or 8000 for local host
var port = process.env.PORT || 8001;


//set dirname to client folder to serve static ASSETS (.css, .png, .jpg)
app.use('/', express.static(__dirname + '/public'));



/* CUSTOM HELPER METHODS - STYLIST SITE */

var stylistNamespace = {};
stylistNamespace.pageEnum = {
  'INDEX' :        'index.html',
  'LIPS'  :        'playground/lips/index.html'
};

var handlePageResponse = function(filename, req, res) {
  var options = {
    root: __dirname + '/public/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  // filename == req.params.name;
  if (!filename || filename==="") { 
    filename = stylistNamespace.pageEnum.INDEX; 
    console.log("ERR HANDLED:  filename = " + filename);
  }
  res.sendFile(filename, options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', filename);
    }
  });
}

/* ----- */



/* EXPRESS ROUTE HANDING */

app.get('/', function(req, res) {
  handlePageResponse( stylistNamespace.pageEnum.INDEX, req, res);
});

app.get('/lips', function(req, res) {
  handlePageResponse( stylistNamespace.pageEnum.LIPS, req, res);
});

/* ----- */



app.listen(port, function() {
  console.log("Listening on port " + port + "...");
});


