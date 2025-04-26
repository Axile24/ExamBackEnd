const jwt = require('jsonwebtoken');
const { findUserById } = require('../models/userPersist'); // Import function to find user by ID

// Middleware to authenticate requests using JWT
async function auth(req, res, next) {
    try {
        // Check if the Authorization header exists and starts with 'Bearer '
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, error: 'Authorization header missing or invalid' });
        }

        // Extract the token from the Authorization header
        const token = authHeader.replace('Bearer ', '');

        // Verify the token using the secret key
        const data = jwt.verify(token, 'a1b1c1-hemligNyckel'); // Replace with process.env.JWT_SECRET for security

        // Find the user associated with the token
        const user = await findUserById(data.id);
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        // Attach token and user ID to the request object for downstream use
        req.token = token;
        req.id = data.id;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Handle invalid or expired tokens
        res.status(401).json({ success: false, error: 'Invalid or expired token' });
    }
}

module.exports = { auth };