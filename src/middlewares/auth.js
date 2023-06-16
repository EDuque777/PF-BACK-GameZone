const JWT = require('jsonwebtoken');
// autentificacion para saber si el user es Admin o no (implementando proceso)
const isAdmin = (req, res, next) => {
    if (req.user.role === 'admin') { // Corregido: req.users -> req.user
        next(); // Permite el acceso a la ruta
    } else {
        res.status(403).json({ message: 'Acceso denegado' });
    }
};

//Protected Routes token base
const requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();

    } catch (error) {
        console.log(error)
    }
}

module.exports = { isAdmin, requireSignIn }