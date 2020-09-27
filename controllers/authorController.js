var Author = require('../models/author');
var Book = require('../models/book');
var async = require('async');

// Показать список всех авторов.
exports.author_list = function(req, res, next) {
    Author.find()
      .populate('author')
      .sort([['family_name', 'ascending']])
      .exec(function (err, authors) {
        if (err) { return next(err); }
        res.render('author_list', { title: 'Авторы', authors });
    });
  };

// Показать подробную страницу для данного автора.
exports.author_detail = function(req, res, next) {

    async.parallel({
        author: function(callback) {
            Author.findById(req.params.id)
              .exec(callback);
        },
        books: function(callback) {
            Book
              .find({ 'author': req.params.id },'title summary')
              .exec(callback);
        },

    }, function(err, results) {
        if (err) { return next(err); } 
        if (!results.author) { 
            var err = new Error('Author not found');
            err.status = 404;
            return next(err);
        }
        
        res.render('author_detail', { title: results.author.name, author: results.author, books: results.books });
    });
};

// Показать форму создания автора по запросу GET.
exports.author_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author create GET');
};

// Создать автора по запросу POST.
exports.author_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author create POST');
};

// Показать форму удаления автора по запросу GET.
exports.author_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author delete GET');
};

// Удалить автора по запросу POST.
exports.author_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author delete POST');
};

// Показать форму обновления автора по запросу GET.
exports.author_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author update GET');
};

// Обновить автора по запросу POST.
exports.author_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author update POST');
};
