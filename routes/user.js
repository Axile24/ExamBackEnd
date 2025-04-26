const express = require('express');
const { check } = require('express-validator');
const { registerUser, loginUser } = require('../controllers/userController');

const router = express.Router();

router.post(
  '/register',
  [
    check('username').notEmpty().withMessage('Username is required'),
    check('email').isEmail().withMessage('Invalid email address'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  registerUser
);

router.post(
  '/login',
  [
    check('email').isEmail().withMessage('Invalid email address'),
    check('password').notEmpty().withMessage('Password is required'),
  ],
  loginUser
);

module.exports = router;
