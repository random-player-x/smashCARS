const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:kPy6bZly5mY8YABk@cluster0.t8citjh.mongodb.net/');

const Votesschema = mongoose.Schema({
    id: Number,
    votes: Number
});

const Votes = mongoose.model('Votes', Votesschema);

module.exports = {
    Votes
}

