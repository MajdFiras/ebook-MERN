import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;


export const createUser = async (req, res) => {
    try {
        const { username, email,password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username,email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ success: true , message: 'User created successfully' });
    }
    catch(err){
        res.status(500).json({ success: false, message: err.message });

    }
}

export const getUsers = async (req, res) => {
    try  {
        const users = await User.find();
        res.status(200).json({ success: true, data: users });
    }
    catch(err){
        res.status(500).json({ success: false, message: err.message });
    }
}


export const loginUser = async (req, res) => {
    try{
        const {username,password} = req.body;
        const user = await User.findOne({username});
        if(!user){
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }
        const token = jwt.sign({ userId: user._id}, SECRET_KEY, { expiresIn: '1h' })
        res.status(200).json({ success: true, message: 'Login successful' } );
        
    }
    catch(err){
        res.status(500).json({ success: false, message: err.message });
    }
}