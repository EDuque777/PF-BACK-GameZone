// const { Games, Developers, Languages, Platforms, Genres, Categories, Images, Videos, Reviews } = require("../db");

// const searchId = async(req, res) => {

//     try {

//         const { id } = req.params;

//         const gameDetail = await Games.findByPk(id, {
//             include: [        
//             { model: Developers, attributes: ['developer'], through: { attributes: [] } },
//             { model: Languages, attributes: ['language'], through: { attributes: [] } },
//             { model: Platforms, attributes: ['platform'], through: { attributes: [] } },
//             { model: Genres, attributes: ['genre'], through: { attributes: [] } },
//             { model: Categories, attributes: ['category'], through: { attributes: [] } },
//             { model: Images, attributes: ['image'], through: { attributes: [] } },
//             { model: Videos, attributes: ['video'], through: { attributes: [] } },
//             { model: Reviews, attributes: ['rating', 'date', 'reviews'], through: {attributes:[]}}
//         ],
//     })

//         return res.status(200).json(gameDetail);

//     } catch (error) {

//         res.status(404).send(error.message);
    
//     }

// }

// module.exports = {
//     searchId
// }


const { Games, Developers, Languages, Platforms, Genres, Categories, Images, Videos, Reviews, Users } = require("../db");

const searchId = async(req, res) => {

    try {

        const { id } = req.params;

        const gameDetail = await Games.findByPk(id, {
            include: [        
            { model: Developers, attributes: ['developer'], through: { attributes: [] } },
            { model: Languages, attributes: ['language'], through: { attributes: [] } },
            { model: Platforms, attributes: ['platform'], through: { attributes: [] } },
            { model: Genres, attributes: ['genre'], through: { attributes: [] } },
            { model: Categories, attributes: ['category'], through: { attributes: [] } },
            { model: Images, attributes: ['image'], through: { attributes: [] } },
            { model: Videos, attributes: ['video'], through: { attributes: [] } },
                {
                  model: Reviews, include: [{ model: Users, attributes: ['name', 'profileImage'], through: { attributes: [] } }]
                }
        ],
    })

        return res.status(200).json(gameDetail);

    } catch (error) {

        res.status(404).send(error.message);
    
    }

}

module.exports = {
    searchId
}