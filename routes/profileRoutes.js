import express from 'express';
import { createProfile, viewProfile } from '../controllers/profileController.js';

const router = express.Router();

// Route to create a new profile
router.post('/create_profile', createProfile);

// Route to view a user profile by user ID
router.get('/profile/:user_id', viewProfile);

export default router;
