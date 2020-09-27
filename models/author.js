var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    first_name: { type: String, required: true, max: 100 },
    family_name: { type: String, required: true, max: 100 },
    date_of_birth: { type: Date },
    date_of_death: { type: Date },
});

// Виртуальное свойство для полного имени автора
Schema
    .virtual('name')
    .get(function () {
        return this.family_name + ', ' + this.first_name;
    });

// Виртуальное свойство - URL автора
Schema
    .virtual('url')
    .get(function () {
        return '/catalog/author/' + this._id;
    });

//Export model
module.exports = mongoose.model('Author', Schema);