const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PublicSchema = new Schema({
    text: { type: String, required: true },
    user: { type: Schema.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Publication', PublicSchema);