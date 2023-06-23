const { Users, Reviews } = require('../db');

const createReview = async (req, res) => {
    try {
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


  module.exports = {
    createReview
};