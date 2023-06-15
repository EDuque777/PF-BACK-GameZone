const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Users', {
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
        email:{
            type: DataTypes.STRING,
            allowNull: false
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        },
        user_name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        country:{
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        timestamps: false
    });
};