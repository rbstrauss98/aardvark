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
        if (!bug) {
            return res.sendStatus(404);
        }
        return res.send(bug);
    } catch(error) {
        console.log(error);
        return res.sendStatus(500);
    }
})

// create bug
router.post('/', async(req, res) => {
    // check for required fields
    if (!req.body.title || !req.body.description) {
        return res.status(400).send({
            message: 'Request missing title or description.'
        });
    }

    try {
        const bug = await models.bug.create({
            title: req.body.title,
            description: req.body.description
        });
        // a solution comment can optionally be provided at creation
        if (req.body.solution) {
            await bug.createComment({
                text: req.body.solution,
                isSolution: 1
            });
        }
        return res.send({
            id: bug.id
        });
    } catch(error) {
        console.log(error);
        return res.sendStatus(500);
    }
})

// delete bug
router.delete('/:id', async(req, res) => {
    try {
        const id = Number.parseInt(req.params.id);
        const deleted = await models.bug.destroy({
            where: {
                id: id
            }
        });
        if (deleted == 0) {
            return res.sendStatus(404);
        }
        return res.sendStatus(200);
    } catch(error) {
        console.log(error);
        return res.sendStatus(500);
    }
})

// update bug
router.put('/:id', async(req, res) => {
    // check for required fields
    if (!req.body.title || !req.body.description) {
        return res.status(400).send({
            message: 'Request missing title or description.'
        });
    }

    try {
        const id = Number.parseInt(req.params.id);
        const updated = await models.bug.update(req.body, {
            where: {
                id: id
            }
        });
        if (updated == 0) {
            return res.sendStatus(404);
        }
        return res.sendStatus(200);
    } catch(error) {
        console.log(error);
        return res.sendStatus(500);
    }
})

module.exports = router;