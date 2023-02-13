const { Sequelize } = require('sequelize');

dbStorage = process.env.NODE_ENV == 'dev' ? 'aardvark-dev.sqlite' : 'aardvark.sqlite';

// create the connection
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbStorage
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