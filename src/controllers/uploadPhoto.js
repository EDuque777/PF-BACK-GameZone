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

const uploadPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No se proporcionó ningún archivo');
    }

    const file = req.file.path;

    const result = await cloudinary.uploader.upload(file, {
        public_id: `${Date.now()}`,
        folder: 'images',
        resource_type: 'auto'
    });
    
    res.status(200).json(result.url);
  } catch (error) {
    res.status(400).send('Error al subir el archivo');
  }
};

module.exports = { upload, uploadPhoto };


