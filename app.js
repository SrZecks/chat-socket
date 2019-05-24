const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

app.use(express.static('public'));
app.use(express.static('views'));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html')
});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
    console.log('Listening to port ' + port);
}

server.listen(port);

/****************** Socket *******************/
users = [];
connections = [];

io.sockets.on('connection', function (socket) {
    connections.push(socket);
    var id = socket.id;
    console.log('Connected: %s sockets connected', connections.length);

    //Disconnect
    socket.on('disconnect', function (data) {
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnnected: %s sockets connected', connections.length);
    });

    //Send name
    socket.on('send_user', function(data){
        io.sockets.emit('new_user',{id:id,name:data});
    });

    //Send Message
    socket.on('send_message', function(name,msg){
        io.sockets.emit('new_message',{id:id,name:name,msg:msg});
    });
;});



