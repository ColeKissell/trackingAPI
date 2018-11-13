const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemsSchema = new Schema (
    {
        name:{type: String},
        description: {type: String}
    }
);
const Items = mongoose.model('Items',ItemsSchema,'Items')
module.exports = Items
