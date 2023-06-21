require('dotenv').config();
const { PAYPAL_ID, PAYPAL_SECRET_KEY, PAYPAL_URL } = process.env;

const createOrder = async (req, res) => {
    try {
        const order = {

        }
        res.status(200).json(info)
    } catch (error) {
        res.status(400).send('Error')
    }
}

const captureOrder = async (req, res) => {
    try {
        const { data } = await axios.get(url)
        let info = data.coming_soon.items
        res.status(200).json(info)
    } catch (error) {
        res.status(400).send('Error')
    }
}

const cancelOrder = async (req, res) => {
    try {
        const { data } = await axios.get(url)
        let info = data.coming_soon.items
        res.status(200).json(info)
    } catch (error) {
        res.status(400).send('Error')
    }
}

module.exports = {
    cancelOrder,
    captureOrder,
    createOrder
}