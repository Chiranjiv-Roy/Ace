const express = require('express'),
  path = require('path');


var app = express();
var server = app.listen(8000);

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

// app.get('/download', (req, res) => {
// 	var filename = req.query['file'];
// 	console.log(path.join(__dirname, 'upload_files/'+filename));
//   res.download(path.join(__dirname, 'upload_files/'+filename));
// });

// io.on('connection', function (socket) {
//   // socket.broadcast.emit('user.events', 'Someone has joined!');
//   console.log("Another tab joined!!!");
//   var uploader = new siofu();
//     uploader.dir = path.join(__dirname, 'upload_files');
//     uploader.listen(socket);
//     uploader.on("saved", (event) => {
//     	var type = mime.getType(event.file.name);
//     	console.log(type);
//         io.sockets.emit('file received', event.file, type);
//     });
//   socket.on('message sent', (message) => {
//   	io.sockets.emit('message received', message);
//   });
// });
