import mongoose from "mongoose";


const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author :{
        type: String,
        required: true
    },
    description :{
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
    amount:{
        type: Number,
    },
    publishedDate: {
        type: Date,
        required: false
    },
    genre: {
        type: String,
        required: false
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
    tags: [String]

}, { timestamps: true });

const Book = mongoose.model("Book", bookSchema);

export default Book;