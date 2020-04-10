const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const verify = require('../middleware/verifyToken');

const UsersController = require('../controllers/UsersController');

const userRoutes = express.Router();

userRoutes.get('/', UsersController.index);

userRoutes.get('/:id',celebrate({[Segments.PARAMS]: Joi.object({
    id: Joi.string().required()}),}), 
    UsersController.show
);

userRoutes.put('/:id', celebrate({[Segments.BODY]: Joi.object({
    name: Joi.string()
        .min(6)
        .required(),
    email: Joi.string()
        .min(6)
        .required()
        .email(),
    password: Joi.string()
        .min(6)
        .required(),
    }),}), 
    verify,
    UsersController.update        
);

userRoutes.delete('/:id', celebrate({[Segments.PARAMS]: Joi.object({
    id: Joi.string().required()}),}), 
    verify, 
    UsersController.destroy
);

module.exports = userRoutes;
