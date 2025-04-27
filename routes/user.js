const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { check, validationResult } = require('express-validator');
const { findOne, insert } = require('../models/userPersist'); // Import the correct methods

// Register a new user
router.post(
  '/register',
  [
    check('username').notEmpty().withMessage('Username is required'),
    check('email').isEmail().withMessage('Invalid email address'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const { username, email, password } = req.body;

      // Check if the user already exists
      const existingUser = await findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'User already exists....oko' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create and save the new user
      const newUser = {
        id: uuidv4(),
        username,
        email,
        password: hashedPassword,
      };

      const savedUser = await insert(newUser);
      res.status(201).json({ success: true, message: 'User registered successfully..Grats', user: savedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
  }
);

// Login an existing user
router.post(
  '/login',
  [
    check('email').isEmail().withMessage('Invalid email address'),
    check('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const { email, password } = req.body;

      // Find the user by email
      const user = await findOne({ email });
      if (!user) {
        return res.status(400).json({ success: false, message: 'Invalid credentials' });
      }

      // Compare the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Invalid credentials' });
      }

      // Generate a JWT token
      const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
      res.json({ success: true, token, user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
  }
);

module.exports = router;
