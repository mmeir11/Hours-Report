const mongoose = require('mongoose');

const Schema = mongoose.Schema();

const employerSchema = new Schema({
    company: {
        type: String,
        require: true,
        minlength: 1,
    },
    hours: {
        type: Array,
        "default" : [],
        trim: true,
    },
});

const Employer = mongoose.model('Employer', employerSchema);

module.exports = Employer;