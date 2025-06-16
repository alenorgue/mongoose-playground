const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    specie: {
        type: String,
        required: true,
    },
    name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 30
        },
       age: {
            type: Number,
            required: true,
            min: 0,
        },
       
});

const Animal = mongoose.model('Animal', animalSchema);

const michi = new Animal({ specie: 'gato', name: 'Vertín', age: 11 });
console.log(michi);