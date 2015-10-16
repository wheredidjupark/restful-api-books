var bookIdController = function(Books, reqBook) {

    var get = function(req, res) {
        var book = new Books(req.body);
        console.log(req.body);
        book.save();
        console.log(book);
        res.status(201).send(book);

    };

    var put = function(req, res) {

        req.book = reqBook;

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
    };

    var patch = function(req, res) {
        req.book = reqBook;

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

    };

    var remove = function(req, res) {
        req.book = reqBook;

        req.book.remove(function(err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(204).send("removed");
            }
        });
    };

    return {
        get: get,
        put: put,
        patch: patch,
        "delete": remove
    };
};

module.exports = bookIdController;
