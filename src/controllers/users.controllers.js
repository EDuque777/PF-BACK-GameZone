const { Users } = require('../db');
const profileImage = 'https://res.cloudinary.com/dcebtiiih/image/upload/v1686950493/images/1686950487877.webp'
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

// Configurar multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});


// Ruta para traer todos los usuario creados (borrado lógico)
const getAllUsers = async (req, res) => {
    try {
        const users = await Users.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Ruta para buscar un usuario por ID creados (borrado lógico)
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
// Ruta para crear un usuario (borrado lógico)
const createUser = async (req, res) => {
    try {
        const { name, email, password, user_name, country, role } = req.body
        const user = Users.findOne({email});
        if (user) return res.send("Usuario ya existe");
        result = await Users.findOrCreate({
            where: {
                name: name,
                email: email,
                password:password,
                user_name:user_name,
                country: country,
                profileImage: profileImage
                role:role
            }
        })
        res.status(200).json("Usuario creado");
    } catch (error) {
         res.status(500).json({ error: error.message });
    }
}
// Ruta para eliminar un usuario (borrado lógico)
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
// Ruta para actuliazr un usuario por ID (borrado lógico)
const updateUser = async (req, res) => {
    try {

        if (!req.file) {
            console.log(req.file);
            return res.status(400).send('No se proporcionó ningún archivo');
          }
      
          const file = req.file.path;
      
          const result = await cloudinary.uploader.upload(file, {
              public_id: `${Date.now()}`,
              folder: 'images',
              resource_type: 'auto'
          });

        const { id } = req.params;
        const { name, email, password, user_name, country } = req.body;
        const updatedUser = await Users.update(
            {
                name: name,
                email: email,
                password: password,
                user_name: user_name,
                country: country,
                profileImage: result.url
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
    banUser,
    upload
};
