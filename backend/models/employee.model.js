const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    username:{
        type: Number,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
    },
    employer:{
        type: Array,
        "default": [],
        trim: true,
    },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;