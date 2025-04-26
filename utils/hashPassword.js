
const bcrypt = require('bcrypt');

async function hashPassword(password) {
    const password = await bcrypt.hash(password, 10);
    return password;            
}
async function comparePassword(password, hash) {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
}
module.exports = { hashPassword, comparePassword };
// const nedb = require('nedb-promise');