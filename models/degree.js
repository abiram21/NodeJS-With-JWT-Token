const mongoose = require('mongoose');

const degreeSchema = mongoose.Schema({
    name: {type: String, required : true}
    
});

module.exports = mongoose.model('Degree', degreeSchema);