const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    id : Number,
    name : String,
    category : String,
    description : String
}).index({
    'description': 'text',
    'name': 'text'
});

module.exports = ticketSchema;
