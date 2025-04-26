const Datastore = require('nedb-promises');
const path = require('path');

// Initialize the NeDB database
const notesDB = Datastore.create({
  filename: path.join(__dirname, '../databases/notesDataBase.db'),
  autoload: true,
});

// Get all notes
const getAllNotes = async () => {
  return await notesDB.find({});
};

// Add a new note
const addNote = async (note) => {
  return await notesDB.insert(note);
};

// Update an existing note
const updateNote = async (id, updatedFields) => {
  return await notesDB.update({ _id: id }, { $set: updatedFields }, { returnUpdatedDocs: true });
};

// Delete a note by ID
const deleteNote = async (id) => {
  const numRemoved = await notesDB.remove({ _id: id });
  return numRemoved > 0;
};

module.exports = { getAllNotes, addNote, updateNote, deleteNote };


