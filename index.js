const express = require('express'),
  socketio = require('socket.io'),
  path = require('path');


var app = express();
var server = app.listen(8000);
var io = socketio.listen(server);

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

// app.get('/download', (req, res) => {
// 	var filename = req.query['file'];
// 	console.log(path.join(__dirname, 'upload_files/'+filename));
//   res.download(path.join(__dirname, 'upload_files/'+filename));
// });

io.on('connection', function (socket) {
  // socket.broadcast.emit('user.events', 'Someone has joined!');
  console.log("Another tab joined!!!");
  socket.on('diff', (edits) => {
  	socket.broadcast.emit('patch',edits);
  });
});

