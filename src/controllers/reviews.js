const moment = require('moment');


const { Users, Reviews, Games } = require('../db');

const createReview = async (req, res) => {
  try {
    //se debe de recibir el id del usuario para hacer la relacion con la review
    const { review, rating, id, name } = req.body;
    console.log(req.body);
    if (!review || !rating ) res.status(400).json({ message: "campos incompletos" })

    const user = await Users.findByPk(id)
    const game = await Games.findOne({ where : { name: name } })

    const createReview = await Reviews.create({ 
        reviews: review,
        rating: rating,
        date: moment().format('DD/ MM/ YYYY') 
      });

    await createReview.addUsers(user)
    await createReview.addGames(game);

      res.status(200).send('Review Creada')
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
}

const updateReview = async (req, res) => {
  try {
    
  
    const { review, rating, id } = req.body

    console.log(req.body);

   
    
    await Reviews.update(
      {
        reviews: review,
        rating: rating,
        date: moment().format('DD/ MM/ YYYY')
      }, 
      { where:{ id } }
    )

    res.status(200).send('Updated Review')

  } catch (error) {
    res.status(400).send({error: error.message})
  }
}


const deleteReview = async (req, res) =>{

   try {
    const { id } = req.params
    console.log("log de body",req.params);

    await Reviews.destroy({ where: 
      { id: id }
    })

    res.status(200).json('Deleted review')

   } catch (error) {
    res.status(404).send(error.message)
   }
}




  module.exports = {
    createReview,
    updateReview,
    deleteReview
};