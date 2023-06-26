const axios = require('axios');
require('dotenv').config();

const reviewsDemo = async (req, res) => {
  try {
    const { id } = req.params;

    const { data } = await axios(`https://store.steampowered.com/appreviews/${id}?json=1`);

    const reviews = data.reviews
      .filter(review => review)
      .map(review => ({ review: review.review }));

    if (reviews.length === 0) {
      return res.status(200).json({ message: 'No comments have been published, be the first to give your opinion.' });
    }

    return res.status(200).json(reviews);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = {
  reviewsDemo
};