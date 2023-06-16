const { Users } = require('../db');
// autentificacion para saber si el user es Admin o no (implementando proceso)
const isAdmin = async (req, res) => {
  try {
    const users = await Users.findAll();
    const isAdminUser = users.some(user => user.isAdmin === true);
    res.status(200).json(isAdminUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {isAdmin}