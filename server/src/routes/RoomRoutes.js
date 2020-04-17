const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const verify = require('../middleware/verifyToken');

const RoomController = require('../controllers/RoomController');

const roomRoutes = express.Router();

roomRoutes.get('/', celebrate({[Segments.BODY]: Joi.object({
    name: Joi.string()})
    ,}), 
    RoomController.index
);

roomRoutes.post('/add-user', celebrate({[Segments.BODY]: Joi.object({
    name: Joi.string()
        .required(),
    user_id: Joi.string()
        .required(),
    }),}), 
    verify,
    RoomController.addUserToRoom        
);

roomRoutes.post('/remove-user', celebrate({[Segments.BODY]: Joi.object({
    name: Joi.string()
        .required(),
    user_id: Joi.string()
        .required(),
    }),}), 
    verify,
    RoomController.removeUserFromRoom        
);

roomRoutes.put('/:id', celebrate({[Segments.BODY]: Joi.object({
    name: Joi.string()
        .required(),
    participants: Joi.array()
        .required()
    }),}), 
    verify,
    RoomController.update        
);

roomRoutes.delete('/:id', celebrate({[Segments.PARAMS]: Joi.object({
    id: Joi.string().required()}),}), 
    verify, 
    RoomController.destroy
);

module.exports = roomRoutes;
