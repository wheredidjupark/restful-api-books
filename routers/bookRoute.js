var express = require('express');

//recommended to wrap the routes with a function
var routes = function(Books) {
    var bookController = require('../controllers/bookController')(Books);
    var bookRouter = express.Router();

    bookRouter.route('/')
        .get(bookController.get)
        .post(bookController.post);

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

    //var bookIdController = require('../controllers/bookIdController')(Books , req.book);

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
            req.book.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.book);
                }
            });
        })
        .patch(function(req, res) {
            if (req.body._id) {
                delete req.body._id;
            }

            for (var p in req.body) {
                req.book[p] = req.body[p];
            }
            req.book.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                } else {

                    res.json(res.book);
                }
            });

        })
        .delete(function(req, res){
            req.book.remove(function(err){
                if(err){
                    res.status(500).send(err);
                } else {
                    res.status(204).send("removed");
                }
            });
        });

    return bookRouter;
};

module.exports = routes;
