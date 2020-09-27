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
        return this.first_name + ' ' + this.family_name;
    });

Schema
    .virtual('short_name')
    .get(function () {
        return this.family_name + ', ' + this.first_name;
    });

Schema
    .virtual('date_of_birth_formatted')
    .get(function () {
      return this.date_of_birth && this.date_of_birth.getFullYear();
    });

Schema
    .virtual('lifespan')
    .get(function () {
        if (this.date_of_birth && this.date_of_death) {
            return this.date_of_birth_formatted + ' - ' + this.date_of_death.getFullYear();
        }
    });

// Виртуальное свойство - URL автора
Schema
    .virtual('url')
    .get(function () {
        return '/catalog/author/' + this._id;
    });

//Export model
module.exports = mongoose.model('Author', Schema);