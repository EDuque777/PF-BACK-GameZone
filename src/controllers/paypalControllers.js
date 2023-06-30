// require('dotenv').config();
// const { PAYPAL_ID, PAYPAL_SECRET_KEY, PAYPAL_URL } = process.env;
// const { Users, Games } = require('../db');
// const axios = require('axios');
// const URL = `${PAYPAL_URL}/v2/checkout/orders`
// let info;

// const createOrder = async (req, res) => {
//     try {
//         info = req.body
//         const order = {
//             intent: "CAPTURE",
//             purchase_units: [
//                 {   
//                     amount: {
//                         currency_code: "USD",
//                         value: info.totalPrice,
//                     },
//                 },
//             ],
//             application_context: {
//                 brand_name: "Gamezone",
//                 landing_page: "NO_PREFERENCE",
//                 user_action: "PAY_NOW",
//                 return_url: "https://back-gamezone-y96h.onrender.com/captureOrder",
//                 cancel_url: "https://back-gamezone-y96h.onrender.com/cancelOrder",
//             }
//         };

//         const params = new URLSearchParams();
//         params.append('grant_type', 'client_credentials');
//         const { data: { access_token } } = await axios.post(`${PAYPAL_URL}/v1/oauth2/token`, params, {
//             auth: {
//                 username: PAYPAL_ID,
//                 password: PAYPAL_SECRET_KEY
//             }
//         });

//         const response = await axios.post(URL, order, {
//             headers:{
//                 Authorization: `Bearer ${access_token}`
//             }
//         });

//         res.send(response.data);
//     } catch (error) {
//         //console.log(error);
//         res.status(400).send('Error');
//     }
// };


// const captureOrder = async (req, res) => {
//     try {
//         const { token } = req.query

//         const response = await axios.post(`${URL}/${token}/capture`, {}, {
//             auth:{
//                 username: PAYPAL_ID,
//                 password: PAYPAL_SECRET_KEY
//             }
//         })
//         //console.log(response.data);

//         const user = await Users.findByPk(info.dataUser.id)

//         for (let i = 0; i < info.cartGames.length; i++) {
//             let game = await Games.findOne({where: {name: info.cartGames[i].name}})
//             await game.addUsers(user);
//         }
        
//         res.redirect('https://front-gamezone-f8fu.vercel.app/user')
//     } catch (error) {
//         res.status(400).send('Error')
//     }
// }

// const cancelOrder = (req, res) => {
//     return res.redirect('http://localhost:3000/cart')
// }

// module.exports = {
//     cancelOrder,
//     captureOrder,
//     createOrder
// }
require('dotenv').config();
const transporter = require('../middlewares/nodemailer')
const { PAYPAL_ID, PAYPAL_SECRET_KEY, PAYPAL_URL } = process.env;
const { Users, Games } = require('../db');
const axios = require('axios');
const URL = `${PAYPAL_URL}/v2/checkout/orders`
let info;

const createOrder = async (req, res) => {
    try {
        info = req.body
        const order = {
            intent: "CAPTURE",
            purchase_units: [
                {   
                    amount: {
                        currency_code: "USD",
                        value: info.totalPrice,
                    },
                },
            ],
            application_context: {
                brand_name: "Gamezone",
                landing_page: "NO_PREFERENCE",
                user_action: "PAY_NOW",
                return_url: "http://localhost:3001/captureOrder",
                cancel_url: "http://localhost:3001/cancelOrder",
            }
        };

        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');
        const { data: { access_token } } = await axios.post(`${PAYPAL_URL}/v1/oauth2/token`, params, {
            auth: {
                username: PAYPAL_ID,
                password: PAYPAL_SECRET_KEY
            }
        });

        const response = await axios.post(URL, order, {
            headers:{
                Authorization: `Bearer ${access_token}`
            }
        });

        res.send(response.data);
    } catch (error) {
        //console.log(error);
        res.status(400).send('Error');
    }
};


const captureOrder = async (req, res) => {
    try {
        const { token } = req.query

        const response = await axios.post(`${URL}/${token}/capture`, {}, {
            auth:{
                username: PAYPAL_ID,
                password: PAYPAL_SECRET_KEY
            }
        })
        //console.log(response.data);

        const user = await Users.findByPk(info.dataUser.id)
        let games = []

        for (let i = 0; i < info.cartGames.length - 1; i++) {
            let game = await Games.findOne({where: {name: info.cartGames[i].name}})
            i < info.cartGames.length - 1? games.push(info.cartGames[i].name): false
            await game.addUsers(user);
        }
        
        games = games.join(', ')
        
        if(!games.length) {
        await transporter.sendMail({
            from: '"THANK YOU for your purchase with us" <carrizosamayito@gmail.com>', // sender address
            to: `${info.dataUser.email}`, // list of receivers
            subject: "THANK YOU for your purchase with us", // Subject line
            html:  `<h1>Thank You for Your Purchase</h1>
                    <p>Dear ${user.dataValues.name},</p>
                    <p>We want to express our sincere gratitude for your purchase of the ${info.cartGames[0].name}!</p>
                    <p>We hope you enjoy many hours of fun and entertainment with this exciting title. Our team has worked hard to provide you with an exceptional gaming experience, and we are confident that you will love it.</p>
                    <p>If you have any questions or need additional assistance, please don't hesitate to contact us. We are here to help you with anything you need.</p>
                    <p>Once again, thank you for trusting us. Have great adventures and unforgettable moments in the virtual world of ${info.cartGames[0].name}!</p>
                    <p>Best regards,</p>
                    <p>The Gamezone Team</p>`
            }
        )
    };

    await transporter.sendMail({
        from: '"THANK YOU for your purchase with us" <carrizosamayito@gmail.com>', // sender address
        to: `${info.dataUser.email}`, // list of receivers
        subject: "THANK YOU for your purchase with us", // Subject line
        html:  `<h1>Thank You for Your Purchase</h1>
                <p>Dear ${user.dataValues.name},</p>
                <p>We want to express our sincere gratitude for your purchase of the following video games:</p>
                <p>${games} & ${info.cartGames[info.cartGames.length - 1].name}</p>
                <p>We hope you enjoy many hours of fun and entertainment with these exciting titles. Our team has worked hard to provide you with exceptional gaming experiences, and we are confident that you will love them.</p>
                <p>If you have any questions or need additional assistance, please don't hesitate to contact us. We are here to help you with anything you need.</p>
                <p>Once again, thank you for trusting us. Have great adventures and unforgettable moments in the virtual worlds of these games!</p>
                <p>Best regards,</p>
                <p>The Gamezone Team</p>`
            }
        )
        
        res.redirect('https://front-gamezone-f8fu.vercel.app/user')
    } catch (error) {
        res.status(400).send('Error')
    }
}

const cancelOrder = (req, res) => {
    return res.redirect('https://front-gamezone-f8fu.vercel.app/cart')
}

module.exports = {
    cancelOrder,
    captureOrder,
    createOrder
}