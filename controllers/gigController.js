import Gig from '../models/gig.js';
import User from '../models/user.js';

// Get all gigs with optional filters
export async function getGigs(req, res) {
  const { page = 1, limit = 10, topic, ustar_category } = req.query;
  const user_id = req.headers['user_id']; 
  const filter = {};
  
  if (topic) filter.topic = topic;
  if (ustar_category) filter.ustar_category = ustar_category;

  try {
    // Validate user role
    const user = await User.findById(user_id);
    // if (!user) {
    //   return res.status(404).json({ error: 'User not found' });
    // }

    if (user.role=="manager"){
      filter.manager_id=user_id
    }
    const gigs = await Gig.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total_gigs = await Gig.countDocuments(filter);
    
    res.json({ page, limit, total_gigs, gigs });
  } catch (err) {
    res.status(400).json({ error: 'Invalid request' });
  }
}

// Create a new gig
export async function createGig(req, res) {
  const { topic, description, title, ustar_category, email } = req.body;

  try {
    const newGig = new Gig({ topic, description, title, ustar_category, email });
    await newGig.save();
    res.status(201).json({ message: 'Gig created successfully', gig_id: newGig._id });
  } catch (err) {
    res.status(400).json({ error: 'Bad request' });
  }
}

// Show gig intent
export async function gigIntent(req, res) {
  const { gig_id, user_id } = req.body;

  try {
    const gig = await Gig.findById(gig_id);
    if (!gig) {
      return res.status(404).json({ error: 'Gig not found' });
    }
    // Notify via webhook simulation (placeholder)
    res.json({ message: 'Intent recorded and notification sent.' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid gig or request' });
  }
}

// View posted gigs by a user
export async function viewPostedGigs(req, res) {
  const { user_id } = req.query;

  try {
    const gigs = await Gig.find({ email: user_id });
    if (!gigs.length) {
      return res.status(404).json({ error: 'No gigs found for this user' });
    }
    res.json({ user_id, posted_gigs: gigs });
  } catch (err) {
    res.status(400).json({ error: 'Invalid request' });
  }
}

// Update gig status
export async function updateGigStatus(req, res) {
  const { gig_id, status } = req.body;

  try {
    const gig = await Gig.findByIdAndUpdate(gig_id, { status }, { new: true });
    if (!gig) {
      return res.status(404).json({ error: 'Gig not found' });
    }
    res.json({ message: 'Gig status updated successfully', gig_id, new_status: gig.status });
  } catch (err) {
    res.status(400).json({ error: 'Invalid request' });
  }
}
