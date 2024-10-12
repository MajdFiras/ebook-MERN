import Book from "../models/book.model.js";
import mongoose from "mongoose";

export const getAllBooks = async (req,res)=>{
    try {
        const books = await Book.find({});
        res.status(200).json({success:true,data : books})
    }
    catch(err){
        res.status(500).json({success:false,message:err.message})
        console.log("Error in getting books",err.message)
     }

};


export const createBook = async (req,res)=>{
    const book = req.body;
    if(!book.title || !book.author || !book.price ||!book.publishedDate || !book.isbn  || !book.cover){
     res.status(400).json({success:false,message:"Fileds Can not be Empty"});
    }
    const newBook = new Book(book);
 
    try {
     await newBook.save();
     res.status(201).json({success:true,data : newBook});
    }
    catch(err){
     res.status(500).json({success:false,message:err.message});
    }
 };


 export const deleteBook = async (req,res)=>{
    const {id} = req.params;
    try {
        await Book.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"Book Deleted Successfully"});

    }
    catch(err){
        res.status(500).json({success:false,message:"Server Error"});
        console.log(err.message);

    }
} ;


export const updateBook = async  (req,res) =>{
    const {id} = req.params;
    const updatedBook = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"Book Not Found"});
    }
    try{
        await Book.findByIdAndUpdate(id,updatedBook,{new:true});
        res.status(200).json({success:true,data : updatedBook});
    }
    catch(err){
        res.status(500).json({success:false,message:"Book Not Found"}); 
    }
};


export const getBookById = async (req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"Book Not Found"});
    }
    try{
        const book = await Book.findById(id);
        res.status(200).json({success:true,data : book});
    }
    catch(err){
        res.status(500).json({success:false,message:"Server Error"});
    }
}

// NOTE: post comment in the books
export const postComment = async (req, res) => {
    const { bookId } = req.params;
    const { comment, userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return res.status(400).json({ success: false, message: "Invalid Book ID" });
    }

    if (!comment || !userId) {
        return res.status(400).json({ success: false, message: "Comment and User ID are required" });
    }

    try {
        // Create the new comment
        const newComment = {
            comment,
            postedBy: userId,
            created: new Date(),
        };

        // Update the book by adding the new comment to the comments array
        const updatedBook = await Book.findByIdAndUpdate(
            bookId,
            { $push: { comments: newComment } },
            { new: true } // Return the updated document
        ).populate('comments.postedBy', 'name email'); // Optionally, populate user details in the response

        if (!updatedBook) {
            return res.status(404).json({ success: false, message: "Book not found" });
        }

        res.status(200).json({ success: true, data: updatedBook.comments });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// NOTE : get the comments in the books



export const getBookComments = async (req, res) => {
    const { bookId } = req.params;

    // Validate if bookId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return res.status(400).json({ success: false, message: "Invalid Book ID" });
    }

    try {
        // Find the book by ID and populate the postedBy field in the comments
        const book = await Book.findById(bookId).populate({
            path: 'comments.postedBy',
            select: 'name email', // You can select the fields you want from the user document
        });

        // If the book is not found, return a 404 response
        if (!book) {
            return res.status(404).json({ success: false, message: "Book not found" });
        }

        // Return the comments associated with the book
        res.status(200).json({ success: true, comments: book.comments });

    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
