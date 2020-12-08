const express = require('express');
const router = express.Router();
const db = require('../database/functions');
const { insert } = require("../schemas/schema");

router.post('/insertComentarios', async (req, res) => {
    const { comentario } = req.body;

    try {

        const request = insert.validate(req.body);

        if (!!request.error) {
          // Retorna erro de falta de campos
          return res.status(400).send({
            statusCode: 400,
            body: {
              status_code: 400,
              message: `O seguinte parâmetro está faltando ou incorreto: ${request.error.details[0].path[0]}`,
            },
          });
        }

        await db.insertCostumer({comentario: comentario}).catch(err => {
            res.status(500).send({
                statusCode: 500,
                body: {
                    error: err,
                    message: 'Não é possivel fazer o cadastro do comentário, ocorreu um erro no banco de dados',
                    status_code: 500
                }
            })
        });
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.status(200).send({
            statusCode: 200,
            body: {
                message: 'Comentario cadastrado com sucesso',
                status_code: 200
            }
        });
    } catch (err) {
        console.log(err)
        return res.status(400).send({
            statusCode: 400,
            body: {
                error: err,
                message: 'Não é possivel fazer o cadastro do comentário',
                status_code: 400
            }
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
            statusCode: 400,
            body: {
                error: err,
                message: 'Não é possivel listar os comentários',
                status_code: 400
            }
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