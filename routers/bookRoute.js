var express = require('express');

//recommended to wrap the routes with a function
var routes = function(Books) {
    var bookRouter = express.Router();

    bookRouter.route('/')
        .get(function(req, res) {

            var query = {};

            if (req.query.genre) {
                query.genre = req.query.genre;
            }
            if (req.query.author) {
                query.author = req.query.author;
            }

            Books.find(query, function(err, books) {
                if (err) {
                    console.error(err);
                } else {
                    res.json(books);
                }
            });
        })
        .post(function(req, res) {
            var book = new Books(req.body);

            book.save();
            console.log(book);
            res.status(201).send(book);

        });

    //middleware implementation specifically for /:bookId 
    bookRouter.use('/:bookId', function(req, res, next) {

        Books.findById(req.params.bookId, function(err, book) {
            if (err) {
                console.error(err);
            } else if (book) {
                req.book = book;
                next();
            } else {
                res.status(404).send('no book found');
            }
        });
    });
    bookRouter.route('/:bookId')
        .get(function(req, res) {
            //obsolete after implmenting middleware
            /*
            Books.findById(req.params.bookId, function(err, book) {
                res.json(book);
            });*/
            res.json(req.book);
        })
        .put(function(req, res) {

            //obsolete after implmenting middleware
            /*
            Books.findById(req.params.bookId, function(err, book) {
                book.title = req.body.title;
                book.author = req.body.author;
                book.genre = req.body.genre;
                book.read = req.body.read;
                book.save();
                res.json(book);
            });*/
            req.book.title = req.body.title;
            req.book.author = req.body.author;
            req.book.genre = req.body.genre;
            req.book.read = req.body.read;
            req.book.save();
            res.json(book);
        });

    return bookRouter;
};

module.exports = routes;
