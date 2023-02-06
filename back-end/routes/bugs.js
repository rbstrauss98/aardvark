const { models } = require('../sequelize');
const express = require('express');

const router = express.Router();

// get all bugs
router.get('/', async(req, res) => {
    try {
        const bugs = await models.bug.findAll();
        return res.send(bugs);
    } catch(error) {
        console.log(error);
        return res.sendStatus(500);
    }
})

// get bug and its comments by id
router.get('/:id', async(req, res) => {
    try {
        const id = Number.parseInt(req.params.id);
        const bug = await models.bug.findByPk(id, {
            include: models.comment
        });
        return res.send(bug);
    } catch(error) {
        console.log(error);
        return res.sendStatus(500);
    }
})

module.exports = router;