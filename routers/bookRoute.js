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

    bookRouter.route('/:bookId')
        .get(function(req, res) {
            Books.findById(req.params.bookId, function(err, book) {
                res.json(book);
            });
        })
        .put(function(req,res){
            Book.findById(req.params.bookId, function(err, book){
                book.title = req.body.title;
                book.author = req.body.author;
                book.genre = req.body.genre;
                book.read = req.body.read;
                book.save();
                res.json(book);
            });
        });

    return bookRouter;
};

module.exports = routes;