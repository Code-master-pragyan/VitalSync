const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.json({ success: false, message: 'Please fill all fields' });
    }
    const exists = await User.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: 'Email already registered' });
    }
    const newUser = new User({ fullName, email, password });
    await newUser.save();
    req.login(newUser, err => {
      if (err) return res.json({ success: false, message: 'Login after signup failed' });
      return res.json({ success: true, user: { id: newUser._id, fullName: newUser.fullName, email: newUser.email } });
    });
  } catch (err) {
    res.json({ success: false, message: 'Signup error', error: err });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.json({ success: false, message: 'Auth error' });
    if (!user) return res.json({ success: false, message: info.message });
    req.login(user, err => {
      if (err) return res.json({ success: false, message: 'Login error' });
      return res.json({ success: true, user: { id: user._id, fullName: user.fullName, email: user.email } });
    });
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return res.json({ success: false, message: 'Logout error' });
    res.json({ success: true, message: 'Logged out' });
  });
});

// Current user
router.get('/current-user', (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ success: true, user: req.user });
  }
  res.json({ success: false, user: null });
});

module.exports = router;
