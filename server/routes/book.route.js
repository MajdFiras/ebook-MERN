import express from 'express';
import { createBook, deleteBook, getAllBooks, updateBook , getBookById } from '../controllers/book.controller.js';
const router = express.Router();

/* Get all Books*/

router.get("/",getAllBooks)


/* Create New Book  */
router.post("/", createBook )

/* Delete a Book  */
router.delete("/:id",deleteBook )


/* Update a Book  */
router.patch("/:id", updateBook)

/* Get a Book by id  */
router.get("/:id",getBookById )

export default router;