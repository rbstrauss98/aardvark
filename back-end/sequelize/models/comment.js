const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('comment', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        isSolution: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                isIn: [[0, 1]]
            }
        }
    });
};