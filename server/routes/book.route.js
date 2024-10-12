import express from 'express';
import { createBook, deleteBook, getAllBooks, updateBook , getBookById , postComment, getBookComments} from '../controllers/book.controller.js';
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

/* Create New Comment  */
router.post("/comment/:bookId",postComment)

/* Get the comments from certien book */
router.get("/comment/:bookId",getBookComments)

export default router;