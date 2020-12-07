const express = require('express');
const router = express.Router();
const db = require('../database/functions');

router.post('/insertComentarios', async (req, res) => {
    const { comentario } = req.body;

    try {

        const insert = await db.insertCostumer({comentario: comentario});
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.send({
            message: 'Comentario cadastrado com sucesso',
            statusCode: 200
        });
    } catch (err) {
        console.log(err)
        return res.status(400).send({
            error: err,
            message: 'Não é possivel fazer o cadastro do comentário',
            statusCode: 400
        });
    }

});

router.get('/buscaComentarios', async (req, res) => {
    try {

        const list = await db.selectCostumers();
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.send(list.reverse());
    } catch (err) {
        console.log(err)
        return res.status(400).send({
            error: err,
            message: 'Não é possivel listar os comentários',
            statusCode: 400
        });
    }

});

router.delete('/deleteComentarios', async (req, res) => {

    const id = req.query.id;

    try {

        const response = await db.deleteCostumer(id);

        return res.send({
            message: 'Comentario deletado com sucesso',
            statusCode: 200
        });
    } catch (err) {
        console.log(err)
        return res.status(400).send({
            error: err,
            message: 'Não é possivel apagar o comentário',
            statusCode: 400
        });
    }

});

module.exports = app => app.use('/testeIBMSmarkio', router);