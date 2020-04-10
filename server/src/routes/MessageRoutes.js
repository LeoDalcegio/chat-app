const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const verify = require('../middleware/verifyToken');

const MessageController = require('../controllers/MessageController');

const roomRoutes = express.Router();

roomRoutes.get('/', RoomController.index);

roomRoutes.get('/:id',celebrate({[Segments.PARAMS]: Joi.object({
    id: Joi.string().required()}),}), 
    RoomController.show
);

roomRoutes.post('/:id', celebrate({[Segments.BODY]: Joi.object({
    name: Joi.string()
        .min(6)
        .required(),
    }),}), 
    verify,
    RoomController.store        
);

roomRoutes.put('/:id', celebrate({[Segments.BODY]: Joi.object({
    name: Joi.string()
        .min(6)
        .required(),
    }),}), 
    verify,
    RoomController.update        
);

roomRoutes.delete('/:id', celebrate({[Segments.PARAMS]: Joi.object({
    id: Joi.string().required()}),}), 
    verify, 
    RoomController.destroy
);

module.exports = userRoutes;
