import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;


export const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, SECRET_KEY, { expiresIn: '1h' });

        res.status(201).json({ 
            success: true, 
            message: 'User created successfully', 
            token 
        });
    } catch (err) {
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
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ success: false, message: 'Username or password is incorrect' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Username or password is incorrect' });
        }

        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
        
        res.status(200).json({ 
            success: true, 
            message: 'Login successful', 
            token 
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

export const getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password'); // Exclude the password
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}