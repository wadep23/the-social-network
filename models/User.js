const { Schema, model } = require('mongoose');

const validateEmail = function(email) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email)
};

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: 'Email is required',
        unique: true,
        validate: [validateEmail, 'Please provide a valid email address.'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, `Email is not valid!`]
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});


const User = model('User', UserSchema);

module.exports = User;