import express from 'express';
import * as gigController from '../controllers/gigController.js';
import { expressInterestInGig, updateGigEngagementStatus } from '../controllers/gigEngagementController.js';

const router = express.Router();

// Route to get all gigs with optional filters
router.get('/gigs', gigController.getGigs);

// Route to create a new gig
router.post('/create_gig', gigController.createGig);

// Route to update the status of a gig
router.patch('/update_gig', gigController.updateGigStatus);

// Route to Show intrest for a gig
router.post('/express_interest', expressInterestInGig);

// Route to update gig engagement status
router.patch('/update_gig_engagement', updateGigEngagementStatus);

export default router;
