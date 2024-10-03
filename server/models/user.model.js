import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    role: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'User',
    },
    phoneNumber:{
        type: String,
        required: false,
    }
    ,
    address: {
        country: {
            type: String,
            required: false, // Make it optional
        },
        city: {
            type: String,
            required: false, // Make it optional
        },
        street: {
            type: String,
            required: false, // Make it optional
        },
        buildingNumber: {
            type: String,
            required: false, // Make it optional
        },
        residentialComplex: {
            type: String,
            required: false, // Make it optional
        },
    }
});

const User = mongoose.model('User', UserSchema);

export default User;
