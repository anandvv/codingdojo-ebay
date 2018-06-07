# Sockets

One of the main reasons developers use Node is to create lightweight web services where the Node server can have persistent connections to the client. Traditional web applications with PHP, Ruby, Python, etc., use the traditional HTTP request/response model where 1) the client sends a request to the web server, 2) the web server takes the request, gets whatever file is requested, and 3) the web server closes that connection.

For things that require this persistent connection (live chat, multiplayer game
on the web, dashboard that updates live whenever things change) using a socket
with Node could improve speed and efficiency by many orders of magnitude.

NodeJS server can serve 100,000+ simultaneous connections whereas a traditional
PHP/Ruby/Python server would be lucky if a single server could handle more than
500 simultaneous connections

#### **Notes**

1. In Rails and other frameworks, they are introducing servers with this socket support. However, it is relatively new, and we think NodeJS is still a better route to go,since it was built specifically for this purpose.
2. NodeJS creates servers whereas other scripting languages are not creating servers, but are to be used with whatever server the developer wants. This unique aspect of NodeJS makes it possible for us to introduce this new factory/server model and scale web apps.

### Install

```
npm instal --save socket.io
```

```javascript
const server = app.listen(1337);
const io = require('socket.io')(server); // server object from express
```

```javascript
io.on('connection', function (socket) { //2

  socket.emit('greeting', { msg: 'Greetings, from server Node, brought to you by Sockets! -Server' }); //3
  socket.on('thankyou', function (data) { // event listener will listen to a thankyou event
    console.log(data.msg); //8 (note: this log will be on your server's terminal)
  });

});
```

### Socket/io emit types

```javascript
socket.on('alpha', function (data) {
  // socket.emit will respond back to the socket client that triggered this 'alpha' listener
  socket.emit('updateClient', { data: 5 });
});

socket.on('beta', function (data) {
  // io.emit will message all socket clients
  io.emit('updateAllClients', { data: 5 });
});

socket.on('gamma', function (data) {
  // socket.broadcast will message all socket clients except the one that triggered the 'gamma' listener
  socket.broadcast.emit('updateAllExceptOne', { data: 5 });
});
```
