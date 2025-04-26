const express = require('express');
const router = express.Router();
const { validateNoteParams } = require('../middleware/check');
const notesPersist = require('../models/notesPersist');

// Get all notes
router.get('/', async (req, res) => {
    try {
        const notes = await notesPersist.getAllNotes();
        res.status(200).json({ success: true, notes });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Add a new note
router.post('/', validateNoteParams, async (req, res) => {
    try {
        const { title, text } = req.body;
        const newNote = await notesPersist.addNote({ title, text });
        res.status(201).json({ success: true, note: newNote });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Update an existing note
router.put('/:id', validateNoteParams, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, text } = req.body;
        const updatedNote = await notesPersist.updateNote(id, { title, text });
        if (!updatedNote) {
            return res.status(404).json({ success: false, error: 'Note not found' });
        }
        res.json({ success: true, note: updatedNote });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Delete a note by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedNote = await notesPersist.deleteNote(id);
        if (!deletedNote) {
            return res.status(404).json({ success: false, error: 'Note not found' });
        }
        res.json({ success: true, message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;


