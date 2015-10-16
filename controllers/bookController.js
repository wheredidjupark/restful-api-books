var bookController = function(Books) {
    var get = function(req, res) {

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
            	var newBooks = [];
            	books.forEach(function(book, index, array){
            		var newBook = book.toJSON();
            		newBook.links = {
            			self: 'http://'+req.headers.host +'/api/books/'+newBook._id
            		};
            		newBooks.push(newBook);
            	});
                res.json(newBooks);
            }
        });
    };

    var post = function(req, res) {
        var book = new Books(req.body);

        book.save();
        console.log(book);
        res.status(201).send(book);

    };

    return {
    	get: get,
    	post: post
    };

};

module.exports = bookController;
