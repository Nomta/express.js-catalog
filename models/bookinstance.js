var mongoose = require('mongoose');

var Schema = mongoose.Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true }, //ссылка на книгу
    imprint: { type: String, required: true },
    status: { type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance' },
    due_back: { type: Date, default: Date.now }
});

Schema
    .virtual('due_back_formatted')
    .get(function () {
      return this.due_back && this.due_back.toLocaleDateString('ru');
    });

    Schema
        .virtual('due_back_year_formatted')
        .get(function () {
          return this.due_back && this.due_back.getFullYear();
        });

// Virtual for bookinstance's URL
Schema
    .virtual('url')
    .get(function () {
       return '/catalog/bookinstance/' + this._id;
    });

//Export model
module.exports = mongoose.model('BookInstance', Schema);