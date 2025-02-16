import express from 'express';
import { signup, login, getUserProfile, getOneUser, deleteProfile, updateProfile, getAllUsers } from '../controllers/user.controllers.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile/:id', getUserProfile);
router.get('/:id', getOneUser);
router.delete('/delete/:id', deleteProfile);
router.put('/update/:id', updateProfile);
router.get('/', getAllUsers);

export default router;
