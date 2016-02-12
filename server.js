var express = require("express");
var app = express();
var http = require("http").Server(app);
app.use(express.static(__dirname + '/target'));
app.set('port', process.env.PORT || 3000);

http.listen(3000, function(){
  console.log('listening on: 3000');
});
