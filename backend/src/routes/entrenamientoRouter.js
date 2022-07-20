const express = require('express')
const EntrenamientoController = require('../controllers/entrenamientoController');

const api = express.Router();

api.get('/:id', EntrenamientoController.getEntrenamientoById);
api.get('', EntrenamientoController.getEntrenamientos);
api.post('', EntrenamientoController.createEntrenamiento);
api.put('/:id', EntrenamientoController.updateEntrenamiento);
api.delete('/:id', EntrenamientoController.deleteEntrenamiento);

module.exports = api;