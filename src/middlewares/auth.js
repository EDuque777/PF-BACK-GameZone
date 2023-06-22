const jwt = require('jsonwebtoken');
require("dotenv").config()
const { JWT_SECRET } = process.env
// autentificacion para saber si el user es Admin o no (implementando proceso)
const isAdmin = (req, res, next) => {
    const token = req.cookies.token
    console.log(token);
    if (!token) {
<<<<<<< HEAD
        res.status(401).json({ message: "autorizacion denegada, no existe un token valido" })
    } else {
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                res.status(403).json({ message: "token invalido" })
            } else {
                if (user.role === 'admin') {

                    next();
                }else {
                    res.status(403).json({ message: 'Acceso denegado' });
                }
            }
        })
    }
}

// Protected Routes token base
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
=======
      res.status(401).json({ message: "autorizacion denegada, no existe un token valido" })
    } else {
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
              res.status(403).json({ message: "token invalido" })
            } else {
                if (user.role === 'admin') {
                  next();
                }else {
                  res.status(403).json({ message: 'Acceso denegado' });
                }
            }
        })
    }
}
module.exports = {isAdmin}
>>>>>>> df7c12aad3672e04f408b3245b8ba06e936ec3a6
