console.log('server is starting');

var express = require('express');
var app = express();
var server = app.listen(8000, listening);

function listening(){
    console.log('listening...');
}

app.use(express.static('website'));

app.get('/search/:catchword', returnInfo);

function returnInfo(request, response){
  var data = request.params;
  response.send('Your request: ' + data.catchword);
}
