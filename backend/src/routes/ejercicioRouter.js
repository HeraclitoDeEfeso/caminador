const express = require('express')
const EjercicioController = require('../controllers/ejercicioController');

const api = express.Router();

api.get('/:id', EjercicioController.getEjercicioById);
api.get('', EjercicioController.getEjercicios);
api.post('', EjercicioController.createEjercicio);
api.put('/:id', EjercicioController.updateEjercicio);
api.delete('/:id', EjercicioController.deleteEjercicio);

module.exports = api;