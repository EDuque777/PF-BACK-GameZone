const axios = require('axios');

const searchId = async(req, res) => {

    try {

        const {id} = req.params;

        const {data} = await axios(`https://store.steampowered.com/api/appdetails?appids=${id}`)

        return res.status(200).json(data);

    } catch (error) {

        res.status(404).send(error.message);
    
    }

}

module.exports = {
    searchId
}