const { Schema, Types } = require('mongoose');
const User = require('./User');

ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId
    },
    reactionBody: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
},
{
    toJSON: {
        getters: true,
        virtuals: true
    },
    id: false
}
);

ReactionSchema.virtual('username').get(async function() {
    let username = await User.findById(this.user)
    .then(dbUserData => {
        return dbUserData.username;
    })
    console.log(username);
    return username || 'Username Not Found'
});

module.exports = ReactionSchema;