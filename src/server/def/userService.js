import mongoose from 'mongoose';

var AccountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0
    },
    lastupdated: {
        type: Date,
        required: true,
        default: new Date()
    }
});

var Account = mongoose.model('Account', AccountSchema);

var UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'disabled'],
        default: 'active'
    }
});

var User = mongoose.model('User', UserSchema);

export { User, Account };
