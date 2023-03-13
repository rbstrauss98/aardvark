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
        // an image can optionally be provided at creation
        if (req.files && req.files.image) {
            // req.files.(name of input field) - TODO: Check with front end on input field name
            let image = req.files.image;
            bug.image = image.data;
            await bug.save();
        }
        // a solution comment can optionally be provided at creation
        if (req.body.solution) {
            await bug.createComment({
                text: req.body.solution,
                isSolution: 1
            });
        }
        return res.send(bug);
    } catch(error) {
        if (error.name == 'SequelizeUniqueConstraintError') {
            return res.status(403).send({
                message: 'A bug with that title already exists.'
            });
        }
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

// create comment on bug
router.post('/:id/comment', async(req, res) => {
    // check for required fields
    if (!req.body.text) {
        return res.status(400).send({
            message: 'Missing text field in request body.'
        });
    }

    try {
        const postID = Number.parseInt(req.params.id);
        const post = await models.bug.findByPk(postID);
        if (!post) {
            return res.sendStatus(404);
        }
        const comment = await post.createComment({
            text: req.body.text
        });
        return res.send({
            comment: comment
        });
    } catch(error) {
        console.log(error);
        return res.sendStatus(500);
    }
})

module.exports = router;