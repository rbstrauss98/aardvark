const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const sequelize = require('./sequelize');
const cors = require('cors');

const PORT = 8080;

const app = express();

async function init() {
    // connect to database
    try {
        await sequelize.authenticate();
    } catch(error) {
        console.error('Unable to connect to the database');
        console.error(error);
        process.exit(1);
    }

    if (process.env.NODE_ENV == 'dev') {
        await initDevDB();
    } else {
        await sequelize.sync();
    }

    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(fileUpload());

    // add routes
    app.use('/api/bugs', require('./routes/bugs'));
    app.use('/api/comments', require('./routes/comments'));

    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`)
    })
}

async function initDevDB() {
    await sequelize.sync({ force: true });
    const testBug1 = await sequelize.models.bug.create({
        title: 'Test bug',
        description: 'Hello world!'
    });
    await testBug1.createComment({
        text: "Here's a comment for the first test bug.",
    });
    await testBug1.createComment({
        text: "And here's another for the first test bug!"
    });
    const testBug2 = await sequelize.models.bug.create({
        title: 'The cooler test bug 😎',
        description: 'This test bug is so cool that it has a solution.'
    });
    await testBug2.createComment({
        text: "I'm a solution!",
        isSolution: 1
    });
    const testBug3 = await sequelize.models.bug.create({
        title: 'The lonely test bug 😢',
        description: 'I have no comments...'
    });
}

init();