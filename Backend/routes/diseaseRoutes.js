import express from 'express';
import Disease from '../models/Disease.js';

const router = express.Router();

// Get all or filtered diseases
router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    const query = search
      ? { name: { $regex: search, $options: 'i' } }
      : {};

    const diseases = await Disease.find(query);
    res.json({ success: true, diseases });
  } catch (err) {
    console.error('Disease fetch error:', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

export default router;
