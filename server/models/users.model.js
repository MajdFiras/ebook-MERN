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
    passowrd : {
     type: String,
     required: [true, 'Password is required'],
    },
    role : {
     type: String,
     enum: ['Admin','User'],
     default: 'User'
    }
    
})


const User = mongoose.model('User', UserSchema);

export default User;   