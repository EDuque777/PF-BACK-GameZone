const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('Games', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    type: {
      type: DataTypes.STRING,
      allowNull: false
    },

    required_age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    is_free: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },

    detailed_description: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    abouth_the_game: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    short_description: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    release_date: {
      type: DataTypes.STRING,
      allowNull: true
    },

    coming_soon:{
      type: DataTypes.BOOLEAN,
      allowNull: false
    },

    support_info: {
      type: DataTypes.JSON,
      allowNull: true
    },

    metacritic: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    
    price_overview:{
      type: DataTypes.STRING,
      allowNull: true
    },
    
  },
  {
    timestamps: false
  });
};
