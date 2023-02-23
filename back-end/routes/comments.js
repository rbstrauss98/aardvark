const { models } = require('../sequelize');
const express = require('express');

const router = express.Router();

// delete comment
router.delete('/:id', async(req, res) => {
    try {
        const id = Number.parseInt(req.params.id);
        const deleted = await models.comment.destroy({
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

// update comment
router.put('/:id', async(req, res) => {
    // check for required fields
    if (!req.body.text) {
        return res.status(400).send({
            message: 'Missing text field in request body.'
        });
    }

    try {
        const id = Number.parseInt(req.params.id);
        const updated = await models.comment.update({
            text: req.body.text
        },
        {
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

// mark comment as solution
router.post('/:id/solve', async(req, res) => {
    try {
        const id = Number.parseInt(req.params.id);
        const updated = await models.comment.update({
            isSolution: 1
        },
        {
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

// unmark comment as solution
router.post('/:id/unsolve', async(req, res) => {
    try {
        const id = Number.parseInt(req.params.id);
        const updated = await models.comment.update({
            isSolution: 0
        },
        {
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