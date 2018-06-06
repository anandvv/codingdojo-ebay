var express = require("express");
var app = express();

app.use(express.static(__dirname + "/static"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + 'index.html');
});

app.get('/cars', (req, res) => {
    res.sendFile(__dirname + '/views/cars.html');
});

app.get('/cats', (req, res) => {
    res.sendFile(__dirname + '/views/cats.html');
});

app.get('/form', (req, res) => {
    res.sendFile(__dirname + '/views/form.html');
});

app.listen(5000, () => {
    console.log('Server started on port 5000');
})