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