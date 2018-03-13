var words = {
  'good': 1,
  'neutral': 0,
  'bad': -1
}

//var spawn = require('child_process').spawn;
//var pythonProcess = spawn('python', ['path/to/script.py', arg1]);

console.log('server is starting');

var express = require('express');
var app = express();
var path = require('path');
var server = app.listen(8000, listening);

function listening(){
    console.log('listening...');
}

app.use(express.static('website'));

app.get('/info', function(req, res){
  res.sendFile(path.join(__dirname+'/website/info.html'));
});


app.get('/add/:catchword/:score?', addInfo);

function addInfo(request, response){
  var data = request.params;
  var word = data.catchword;
  var score = Number(data.score);
  if(!score){
    response.send('Score is required');
    return;
  }
  words[word] = score;
  response.send('Your request: ' + data.catchword +' is in database');
}

app.get('/json', sendJson);

function sendJson(request, response){
  response.send(words);
}

app.get('/search/:catchword', searchInfo);

function searchInfo(request, response){
  var word = request.params.catchword;
  var reply;
  if(words[word]){
    reply = {
      status: "found",
      word: word,
      score: words[word]
    }
  }
  else{
    reply = {
      status: "not found",
      word: word
    }
  }
  response.send(reply);
}
