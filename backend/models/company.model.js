const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const companySchema = new Schema({
    company:{
        type: String,
        required: true,
        minlength: 1,
    },
    professions: {
        type: Array,
        "default": [],
    },
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;