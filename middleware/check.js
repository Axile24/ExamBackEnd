/**
 * Middleware to validate required parameters for note creation or update.
 * Ensures that both `title` and `text` are present in the request body.
 */
function validateNoteParams(req, res, next) {
    const { title, text } = req.body;

    // Check if required parameters are missing
    if (!title || !text) {
        return res.status(400).json({ success: false, error: 'Missing required parameters: title and text are required.' });
    }

    // Proceed to the next middleware or route handler
    next();
}

module.exports = { validateNoteParams };