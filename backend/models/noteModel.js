const mongoose = require('mongoose');

const schema = mongoose.Schema;

const noteSchema = schema({
    title: {
        type: String,
        required: [true, 'Title must be mandatory.']
    },
    desc: {
        type: String
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Note', noteSchema);
