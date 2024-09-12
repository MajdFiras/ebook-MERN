import express from 'express';
import {createUser, getUsers ,loginUser} from '../controllers/user.controller.js';


const router = express.Router();



/* Create User */
router.post('/register',createUser);

/* Get all users */
router.get('/users',getUsers)

/* Login users */
router.post('/login',loginUser)


export default router;
