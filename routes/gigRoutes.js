import express from 'express';
import * as gigController from '../controllers/gigController.js';
import { expressInterestInGig, updateGigEngagementStatus, getInterestedUsers, getInterestedGigs } from '../controllers/gigEngagementController.js';

const router = express.Router();

// Route to get all gigs with optional filters
router.get('/gigs', gigController.getGigs);

// Rooute to fetch one gig
router.get('/gigs/:gig_id', gigController.getGigById);

// Route to create a new gig
router.post('/create_gig', gigController.createGig);

// Route to add collaborator to a gig
router.patch('/gigs/:gig_id/collaborators', gigController.addCollaborator);

// Route to remove collaborator from a gig
router.delete('/gigs/:gig_id/collaborators/:collaborator_id', gigController.removeCollaborator);

// Route to update the status of a gig
router.patch('/update_gig', gigController.updateGigStatus);

// Route to update the status of a gig
router.patch('/gigs/:gig_id', gigController.updateGigDetails);

// Route to Show intrest for a gig
router.post('/express_interest', expressInterestInGig);

// Route to update gig engagement status
router.patch('/update_gig_engagement', updateGigEngagementStatus);

// Endpoint to fetch interested users for a gig
router.get('/gig/:gig_id/interested', getInterestedUsers);

// Endpoint to fetch interested gigs by user
router.get('/intrested_gigs', getInterestedGigs);

export default router;
