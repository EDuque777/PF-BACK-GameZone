const { Users, Reviews } = require('../db');

const createReview = async (req, res) => {
    try {
      //se debe de recibir el id del usuario para hacer la relacion con la review
      const { review, rating, id } = req.body;
      if (!review || !rating ) res.status(400).json({ message: "campos imcompletos" })

      const user = await Users.findByPk(id)
      
      const createReview = await Reviews.create({ 
          reviews: review,
          rating: rating,
          date: Date.now()
        });
      
      await createReview.addUsers(user);
      
        res.status(200).send('Review Creada')
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateReview = async (req, res) => {
  try {
    const { id } = req.query;
    const { review, rating } = req.body
    
    await Reviews.update(
      {
        reviews: review,
        rating: rating,
        date: Date.now()
      }, 
      {where:{id}}
    )

    res.status(200).send('Updated Review')

  } catch (error) {
    res.status(400).send({error: error.message})
  }
}


  module.exports = {
    createReview,
    updateReview
};