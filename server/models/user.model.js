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
    avatar: {
        type: String,
        default: 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg',
        required: false,
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
