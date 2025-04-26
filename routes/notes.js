const express = require('express');
const { getAllNotes, addNote } = require('../controllers/notesController');

const router = express.Router();

router.get('/', getAllNotes);
router.post('/', addNote);

module.exports = router;


