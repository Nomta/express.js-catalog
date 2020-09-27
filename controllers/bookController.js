var Book = require('../models/book');
var BookInstance = require('../models/bookinstance');
var Genre = require('../models/genre');
var async = require('async');

// Display list of all books.
exports.book_list = function(req, res, next) {
    Book.find({}, 'title author')
      .populate('author')
      .sort([['title', 'ascending']])
      .exec(function (err, books) {
        if (err) { return next(err); }
        res.render('book_list', { title: 'Книги', books });
    });
};

// Display detail page for a specific book.
exports.book_detail = function(req, res, next) {

    async.parallel({
        book: function(callback) {
            Book.findById(req.params.id)
              .populate('author')
              .populate('genre')
              .exec(callback);
        },
        instances: function(callback) {
            BookInstance
              .find({ 'book': req.params.id })
              .exec(callback);
        },

    }, function(err, results) {
        if (err) { return next(err); }
        if (!results.book) {
            var err = new Error('Book not found');
            err.status = 404;
            return next(err);
        }
        
        res.render('book_detail', { title: results.book.title, book: results.book, instances: results.instances });
    });
};

// Display book create form on GET.
exports.book_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book create GET');
};

// Handle book create on POST.
exports.book_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book create POST');
};

// Display book delete form on GET.
exports.book_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete GET');
};

// Handle book delete on POST.
exports.book_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete POST');
};

// Display book update form on GET.
exports.book_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update GET');
};

// Handle book update on POST.
exports.book_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update POST');
};
