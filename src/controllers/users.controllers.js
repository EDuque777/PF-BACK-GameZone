const { Users, Games, GameReviews } = require('../db');
const profileImage = 'https://res.cloudinary.com/dcebtiiih/image/upload/v1686950493/images/1686950487877.webp'
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const bcrypt = require("bcryptjs")
const { createAccessToken } = require("../middlewares/jwt.js")

// Configuracion de multer para la subida de imgenes
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
// Ruta para buscar un usuario por ID o name creados (borrado lógico)
const getUser = async (req, res) => {
  try {
    let user;
    if (req.query.name) {
      user = await Users.findOne({ where: { name: req.query.name } });
    } else {
      const { id } = req.params;
      user = await Users.findByPk(id);
    }
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ruta para crear un usuario (borrado lógico)
//const createUser = async (req, res) => {
//    try {
//        const { name, email, password, role } = req.body
//        result = await Users.findOrCreate({
//            where: {
//                name: name,
//                email: email,
//                password:password,
//                role : role,
//            }
//        })
//        res.status(200).json("Usuario creado");
//    } catch (error) {
//         res.status(500).json({ error: error.message });
//    }
//}

const createUser = async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      if (!email || password.length < 8 || !password || !name) {
  
        res.status(400).json({ message: "datos invalidos" })
      } else {
        // Verificacion del correo 
        const existingUser = await Users.findOne({
          where: {
            email: email
          }
        });
  
        if (existingUser) {
          return res.status(400).json({ error: "El correo electrónico ya está registrado" });
        }
        const salt = await bcrypt.genSalt(12)
  
        const cripto = await bcrypt.hash(password, salt)
        const createUserAdmin = await Users.create({
  
          name: name,
          email: email,
          password: cripto,
          profileImage: profileImage,
          role: role
        });
        const token = await createAccessToken({id : createUserAdmin.id, role : createUserAdmin.role})
        res.cookie("token", token)
        res.status(200).json({
          message: "Usuario Creado,",
          createUserAdmin
        })
      }
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
 };

// Ruta para eliminar un usuario (borrado lógico)
const deleteUser = async (req, res) => {
  try {
    let deletedUser;

    if (req.query.name) {
      deletedUser = await Users.destroy({ where: { name: req.query.name } });
    } else {
      const { id } = req.params;
      deletedUser = await Users.destroy({ where: { id: id } });
    }

    if (deletedUser) {
      res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ruta para actuliazr un usuario por ID (borrado lógico)
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, user_name, country } = req.body;

    let imageUrl;

    if (req.file) {
      console.log(req.file);
      const file = req.file.path;

      const result = await cloudinary.uploader.upload(file, {
        public_id: `${Date.now()}`,
        folder: 'images',
        resource_type: 'auto'
      });

      imageUrl = result.url;
    }

    const [updatedCount] = await Users.update(
      {
        name,
        email,
        password,
        user_name,
        country,
        profileImage: imageUrl
      },
      { where: { id } }
    );

    if (updatedCount === 1) {
      res.status(200).json({ message: 'Usuario actualizado correctamente' });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario' });
  }
};

// Ruta para banear un usuario (borrado lógico)
const banUser = async (req, res) => {
  try {
    let bannedUser;

    if (req.query.name) {
      // Bannear usuario por name
      bannedUser = await Users.findOne({ where: { name: req.query.name } });
    } else if (req.params.userId) {
      // Bannear usuario por ID
      bannedUser = await Users.findByPk(req.params.userId);
    }

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

const gamesUser = async (req, res) => {
  try {
    //se debe recibir el id para que traiga los juegos del usuario
    const { id } = req.query
    
    const userGames = await Users.findByPk(id, {
      attributes: { exclude: ['id', 'role', 'email', 'password', 'country', 'confirmPassword'] },
      include: [
        { model: Games, attributes: ['id', 'name', 'header_image'], through: { attributes: [] } }
      ],
    })

      res.status(200).json(userGames)
  } catch (error) {
      res.status(400).send( { error: error.message } )
  }
}



module.exports = {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  banUser,
  gamesUser,
  upload
};
