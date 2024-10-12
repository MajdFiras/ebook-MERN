import mongoose from "mongoose";

const { Schema } = mongoose;    
const { ObjectId } = Schema.Types

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
    },
    publishedDate: {
        type: Date,
    },
    genre: {
        type: String,
    },
    isbn: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ['Available', 'Out of Stock', 'Pre-order'],
        default: 'Available'
    },
    tags: [String], 
    comments: [
        {
            comment: { type: String, required: true }, // Store comment text
            postedBy: { type: ObjectId, ref: 'User', required: true }, // Reference to User model
            created: { type: Date, default: Date.now } // Automatically set created date
        }
    ]
}, { timestamps: true });

const Book = mongoose.model("Book", bookSchema);

export default Book;

