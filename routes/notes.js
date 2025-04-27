const express = require('express');
const { getAllNotes, addNote, deleteNote, updateNote } = require('../controllers/notesController');

const router = express.Router();

// Define routes
router.get('/', getAllNotes);
router.post('/', addNote);
router.delete('/:id', deleteNote);
router.put('/:id', updateNote); // Corrected function name

module.exports = router;


