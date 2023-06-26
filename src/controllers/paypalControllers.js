require('dotenv').config();
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

        for (let i = 0; i < info.cartGames.length; i++) {
            let game = await Games.findOne({where: {name: info.cartGames[i].name}})
            await game.addUsers(user);
        }
        
        res.redirect('http://localhost:3000/user')
    } catch (error) {
        res.status(400).send('Error')
    }
}

const cancelOrder = (req, res) => {
    return res.redirect('http://localhost:3000/cart')
}

module.exports = {
    cancelOrder,
    captureOrder,
    createOrder
}