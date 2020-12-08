const Joi = require("@hapi/joi");

const watson = Joi.object({
  text: Joi.string().required(),
});

const insert = Joi.object({
  comentario: Joi.string().required(),
});

module.exports = {
    watson,
    insert
};
