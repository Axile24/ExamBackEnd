const Datastore = require('nedb-promises');
const path = require('path');

// Initialize the database
const notesDB = Datastore.create({
  filename: path.join(__dirname, '../databases/notesDataBase.db'),
  autoload: true,
});

// Log when the database is connected
console.log('Connected to notes database: notesDataBase.db');

// Get all notes
const getAllNotes = () => notesDB.find({});

// Add a new note
const addNote = (note) => notesDB.insert(note);

module.exports = { getAllNotes, addNote };


