var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var db = mongoose.connect('mongodb://localhost/bookAPI');


var app = express();
var Books = require('./models/bookModel');
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var bookRouter = require('./routers/bookRoute')(Books);

app.use('/api/books', bookRouter);

app.get("/", function(req, res) {
    res.send("Welcome to my API");
});

app.listen(port, function() {
    console.log("listening on PORT:" + port);
});
