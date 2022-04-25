const { Schema, model } = require('mongoose');
const ReactionSchema = require('./Reaction');

ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reactions: [ReactionSchema]
},
{
    toJSON: {
        getters: true,
        virtuals: true
    },
    id: false
}
);

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;