  
const DataTypes = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Reviews', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        review: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        timestamps: false
    });
};