const notesPersist = require('../models/notesPersist');

const getAllNotes = async (req, res) => {
  try {
    const notes = await notesPersist.getAllNotes();
    res.status(200).json({ success: true, notes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const addNote = async (req, res) => {
  try {
    const { title, text } = req.body;
    if (!title || !text) {
      return res.status(400).json({ success: false, error: 'Title and text are required' });
    }
    const newNote = await notesPersist.addNote({ title, text });
    res.status(201).json({ success: true, note: newNote });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { getAllNotes, addNote };