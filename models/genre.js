var mongoose = require('mongoose');

var Schema = mongoose.Schema({
    name: { type: String, required: true, min: 3, max: 100 }
});

// Virtual for genre's URL
Schema
    .virtual('url')
    .get(function () {
       return '/catalog/genre/' + this._id;
    });

//Export model
module.exports = mongoose.model('Genre', Schema);