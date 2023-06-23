const { Users, Reviews } = require('../db');




const createReview = async (req, res) => {

    try {
      const { review, rating, id } = req.body;
      if (!review || !rating ) {
  
        res.status(400).json({ message: "campos imcompletos" })
      }
  

        const createReview = await Reviews.create({
            
            review: review,
            rating: rating,
            date: Date.now(),


        });
        const token = await createAccessToken({id : createUserAdmin.id, role : createUserAdmin.role})
        res.cookie("token", token)
        res.status(200).json({
          message: "Usuario Creado,",
          createUserAdmin
        })
      
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}


  module.exports = {
    createReview
};