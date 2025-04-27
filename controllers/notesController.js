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

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, error: 'Note ID is required' });
    }
    const deletedNote = await notesPersist.deleteNote(id);
    if (!deletedNote) {
      return res.status(404).json({ success: false, error: 'Note not found' });
    }
    res.status(200).json({ success: true, message: 'Note deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, text } = req.body;
    if (!id || !title || !text) {
      return res.status(400).json({ success: false, error: 'Note ID, title, and text are required' });
    }
    const updatedNote = await notesPersist.update(id, { title, text });
    if (!updatedNote) {
      return res.status(404).json({ success: false, error: 'Note not found' });
    }
    res.status(200).json({ success: true, note: updatedNote });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Export the controller functions
module.exports = { getAllNotes, addNote, deleteNote, updateNote };