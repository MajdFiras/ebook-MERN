import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import bookRoutes from './routes/book.route.js';
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
/* Middlewares */
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

/* ================ */ 



app.use("/api/books", bookRoutes)

app.listen(PORT,()=>{
    try {
        connectDB();
        console.log(`Server Start at port 5000 check : http://localhost:${PORT}`);
    } catch (err){
        console.log(err.message);
    }
   
})
