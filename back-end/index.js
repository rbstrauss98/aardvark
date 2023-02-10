const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./sequelize');
const cors = require('cors');

const PORT = 8080;

const app = express();

async function init() {
    app.use(cors());
    // connect to database
    try {
        await sequelize.authenticate();
    } catch(error) {
        console.error('Unable to connect to the database');
        console.error(error);
        process.exit(1);
    }

    // create fresh database and fill with some testing data
    await sequelize.sync({ force: true });
    const testBug = await sequelize.models.bug.create({
        title: 'Test bug',
        description: 'Hello world!'
    });
    await testBug.createComment({
        text: "Here's one comment.",
        isSolution: 1
    });
    await testBug.createComment({
        text: "And here's another!"
    })

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

    // add routes
    app.use('/api/bugs', require('./routes/bugs'));

    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`)
    })
}

init();