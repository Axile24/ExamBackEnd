const Datastore = require('nedb-promises');
const path = require('path');

// Initialize the database
const userDB = Datastore.create({
  filename: path.join(__dirname, '../databases/usersDataBase.db'),
  autoload: true,
});

// Log when the database is connected
console.log('Connected to users database: usersDataBase.db');

// Find a single user by query
const findOne = (query) => userDB.findOne(query);

// Insert a new user into the database
const insert = (user) => userDB.insert(user);

module.exports = { findOne, insert };