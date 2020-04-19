
// Using express: http://expressjs.com/
var express = require('express');
// Create the app
var app = express();
var server = app.listen(process.env.PORT || 4000, listen);



app.use(express.static('./build/'));

// // This call back just tells us that the server has started
function listen() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('React app live at http://' + host + ':' + port);
}
