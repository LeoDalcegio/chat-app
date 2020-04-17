const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const verify = require('../middleware/verifyToken');

const MessageController = require('../controllers/MessageController');

const messageRoutes = express.Router();

messageRoutes.get('/', celebrate({[Segments.BODY]: Joi.object({
    room: Joi.string()
        .required(),
    }),}), 
    MessageController.index
);

messageRoutes.get('/:id',celebrate({[Segments.PARAMS]: Joi.object({
    id: Joi.string()
        .required(),
    }),}), 
    MessageController.show
);
 
messageRoutes.post('/', celebrate({[Segments.BODY]: Joi.object({
    content: Joi.string()
        .required(),
    room: Joi.string()
        .required(),
    user: Joi.string()
        .required()
    }),}), 
    verify,
    MessageController.store        
);

messageRoutes.put('/:id', celebrate({[Segments.BODY]: Joi.object({
    content: Joi.string()
        .min(6)
        .required(),
    room: Joi.string()
        .required(),
    user: Joi.string()
        .required()
    }),}), 
    verify,
    MessageController.update        
);

messageRoutes.delete('/:id', celebrate({[Segments.PARAMS]: Joi.object({
    id: Joi.string().required()}),}), 
    verify, 
    MessageController.destroy
);

module.exports = messageRoutes;
