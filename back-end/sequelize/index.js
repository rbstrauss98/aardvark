const { Sequelize } = require('sequelize');

// create the connection
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'aardvark.sqlite'
});

const modelDefiners = [
    require('./models/bug'),
    require('./models/comment')
];

// define the models
for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

// setup associations
const { bug, comment } = sequelize.models;
bug.hasMany(comment, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
comment.belongsTo(bug);

module.exports = sequelize;