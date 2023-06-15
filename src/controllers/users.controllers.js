const { Users } = require('../db');

const getAllUsers = async (req, res) => {
    try {
        const users = await Users.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.findByPk(id,);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createUser = async (req, res) => {
    try {
        const { name, email, password, user_name, country } = req.body
        result = await Users.findOrCreate({
            where: {
                name: name,
                email: email,
                password:password,
                user_name:user_name,
                country: country,
            }
        })
        res.status(200).json("Usuario creado");
    } catch (error) {
         res.status(500).json({ error: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await Users.destroy({ where: { id: id } });
        if (deletedUser) {
            res.status(200).json({ message: 'Usuario eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, user_name, country } = req.body;
        const updatedUser = await Users.update(
            {
                name: name,
                email: email,
                password: password,
                user_name: user_name,
                country: country
            },
            { where: { id: id } }
        );
        if (updatedUser[0] === 1) {
            res.status(200).json({ message: 'Usuario actualizado correctamente' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Usuario no existe' });
    }
}

// Ruta para banear un usuario (borrado lógico)
const banUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const bannedUser = await Users.findByPk(userId);
  
      if (!bannedUser) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      bannedUser.status = 'baneado';
      bannedUser.bannedAt = new Date();
      await bannedUser.save();
  
      res.json({ message: 'Usuario baneado exitosamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al banear el usuario' });
    }
  };
module.exports = {
    getAllUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser,
    banUser
};
