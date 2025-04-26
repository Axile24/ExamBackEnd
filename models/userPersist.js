const Datastore = require('nedb-promises');
const path = require('path');

// Initialize the NeDB database
const usersDB = Datastore.create({
  filename: path.join(__dirname, '../databases/usersDataBase.db'),
  autoload: true,
});

// Find a user by email
const findOne = async (query) => {
  return await usersDB.findOne(query);
};

// Add a new user
const insert = async (user) => {
  return await usersDB.insert(user);
};

module.exports = { findOne, insert };