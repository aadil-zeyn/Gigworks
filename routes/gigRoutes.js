import express from 'express';
import * as gigController from '../controllers/gigController.js';

const router = express.Router();

// Route to get all gigs with optional filters
router.get('/gigs', gigController.getGigs);

// Route to create a new gig
router.post('/create_gig', gigController.createGig);

// Route for showing gig intent
router.post('/gig_intent', gigController.gigIntent);

// Route to view posted gigs by user
router.get('/gig_status', gigController.viewPostedGigs);

// Route to update the status of a gig
router.patch('/update_gig', gigController.updateGigStatus);

export default router;
