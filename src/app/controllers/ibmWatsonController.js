'use strict'

const express = require('express');
const router = express.Router();
const fs = require('fs');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
var count = 0;
const { watson } = require("../schemas/schema");


router.post('/textToSpeech', async (req, res) => {
    try {

        const request = watson.validate(req.body);

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

        const textToSpeech = new TextToSpeechV1({
            authenticator: new IamAuthenticator({ apikey: 'w6mFP0lo1OD3KeuT6ieLkCnbEcJyi_NlUdHh8xc0pTIu' }),
            serviceUrl: 'https://stream.watsonplatform.net/text-to-speech/api/'
          });

          const params = {
            text: req.body.text,
            voice: 'pt-BR_IsabelaVoice', // Optional voice
            accept: 'audio/wav'
          };

          await textToSpeech
            .synthesize(params)
            .then(async response =>  {
                const audio = response.result;
                return textToSpeech.repairWavHeaderStream(audio);
            })
            .then( repairedFile => {
                fs.writeFileSync('app/interface_ui/audio' + count + '.wav', repairedFile);
                console.log('audio.wav written with a corrected wav header');
                if (count > 0) {
                    fs.unlinkSync('app/interface_ui/audio' + (count - 1) + '.wav');
                }
            })
            .catch(err => {
                console.log(err);
            });
            
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.send(count.toString())
            count ++
    } catch (err) {
        console.log(err)
        return res.status(400).send({
          statusCode: 400,
          body: {
            error: err,
            message: 'Não é possivel fazer a leitura do comentário',
            statue_code: 400
          }
        });
    }

});

module.exports = app => app.use('/testeIBMSmarkio', router);