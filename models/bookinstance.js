var mongoose = require('mongoose');

var Schema = mongoose.Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true }, //ссылка на книгу
    imprint: { type: String, required: true },
    status: { type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance' },
    due_back: { type: Date, default: Date.now }
});

// Virtual for bookinstance's URL
Schema
    .virtual('url')
    .get(function () {
       return '/catalog/bookinstance/' + this._id;
    });

//Export model
module.exports = mongoose.model('BookInstance', Schema);