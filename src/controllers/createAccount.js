const { Users } = require("../db")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { createAccessToken } = require("../middlewares/jwt.js")
const express = require('express');
const router = express.Router();

require("dotenv").config()

const { JWT_SECRET, URL_INICIO } = process.env

const createAccount = async (req, res) => {
    try {

        const { email, password, name, user_name, country} = req.body

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

            }else{

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
                const token = await createAccessToken({id : createUser.id}) // esto podria se opcional
                //const token = jwt.sign({id : createUser.id}, JWT_SECRET, {expiresIn : "1d"})
                //console.log(token, " esto es el token")
    
                res.cookie("token", token)
                res.status(200).json({
                    message : "Usuario Creado"
                })
            }
        }

    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

//const redirectToHome = (req, res) => {
//    try {
//
//        console.log(URL_INICIO)
//
//        return res.redirect(URL_INICIO)
//        
//    } catch (error) {
//        res.status(500).json({message : error.message})
//    }
//}

module.exports = {
    createAccount
}