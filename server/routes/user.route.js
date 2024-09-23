import express from 'express';
import {createUser, getUsers ,loginUser, getUserInfo} from '../controllers/user.controller.js';


const router = express.Router();



/* Create User */
router.post('/register',createUser);

/* Get all users */
router.get('/users',getUsers)

/* Login users */
router.post('/login',loginUser)

router.get('/user/:id',getUserInfo)
export default router;
