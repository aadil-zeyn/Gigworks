import Profile from '../models/profile.js';

// Create a profile
export async function createProfile(req, res) {
  const { name, email, skills, bio, profile_picture_url } = req.body;

  try {
    const newProfile = new Profile({ name, email, skills, bio, profile_picture_url });
    await newProfile.save();
    res.status(201).json({ message: 'Profile created successfully', profile_id: newProfile._id });
  } catch (err) {
    res.status(400).json({ error: 'Bad request' });
  }
}

// View profile by user ID
export async function viewProfile(req, res) {
    const { user_id } = req.params; // Get user_id from request parameters
  
    try {
      const profile = await Profile.findById(user_id); // Retrieve profile by user ID
      if (!profile) {
        return res.status(404).json({ error: 'Profile not found' }); // Handle case where profile does not exist
      }
      res.json(profile); // Respond with the profile data
    } catch (err) {
      res.status(400).json({ error: 'Invalid request' }); // Handle any other errors
    }
  }