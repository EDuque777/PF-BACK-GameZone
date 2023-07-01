const router = require("express").Router()
const { Users } = require("../db")
const { createAccessToken } = require("../middlewares/jwt")
const jwt = require("jsonwebtoken")

require("dotenv").config()
const { JWT_SECRET } = process.env

// ESTA FUNCION ESTA EN PROCESO

const forgotPassword = async (req, res) => {
    try {

        const { email } = req.body

        const oldUser = await Users.findOne({
            where : {
                email
            }
        })

        if (!oldUser) {
            return res.status(404).send("The user not exists")
        }else{
            const token = await createAccessToken({id : oldUser.id, email : oldUser.email})

            const link = `http://localhost:3001/reset-password/${oldUser.id}/${token}`

            res.status("done")

            console.log(link)
        }
    } catch (error) {
        console.log(error)
    }
}

const resetPassword = async (req, res) => {
    try {
        const { id, token } = req.params
        console.log(req.params)

        const oldUser = await Users.findOne({
            where : {
                id
            }
        })

        if (!oldUser) {
            res.json({ message : "el usuario no existe"})
        }else{

            const verify = await jwt.verify(token, JWT_SECRET)
            //res.send("verified")
            res.render("index", {email: verify.email})
        }
        
        //res.send("Done")
    } catch (error) {
        res.send("Not verified")
        console.log(error)
    }
}

module.exports = {
    forgotPassword,
    resetPassword
}