const { Users } = require("../db")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const { createAccessToken } = require("../middlewares/jwt.js")

require("dotenv").config()

const { JWT_SECRET } = process.env

const createAccount = async (req, res) => {
    try {
        const { email, password, name, user_name, country } = req.body

        if (!email || password.length < 8 || !password || !name || !country || !user_name ) {
            
            res.status(400).json({message : "datos invalidos"})

        }else{

            const existUer = await Users.findOne({
                where : {
                    email : email
                }
            })

            if (existUer) {

                res.status(400).json({message : "el usuario ya existe!!!"})

            } else {

                const salt = await bcrypt.genSalt(12)

                const cripto = await bcrypt.hash(password, salt)

                const createUser = await Users.create({
                    name,
                    email,
                    password : cripto,
                    user_name,
                    country
                })

                // esto se convierte en un middlewares
                // para validar el token tenemos que crear el login
                const token = await createAccessToken({id : createUser.id})
                //const token = jwt.sign({id : createUser.id}, JWT_SECRET, {expiresIn : "1d"})

                console.log(token, " esto es el token")

                res.cookie("token", token)

                res.status(201).json(// envio los datos del usuario recien registrado(opcional)
                    {
                        message : "Usuario Creado !!",
                        name : name,
                        email : email,
                        user_name : user_name,
                        country : country
                    }
                )

                console.log(createUser)
            }
        }

    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

module.exports = {
    createAccount
}