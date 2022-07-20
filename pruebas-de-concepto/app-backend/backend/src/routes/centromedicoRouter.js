const express = require('express')
const CentromedicoController = require('../controllers/centromedicoController');

const api = express.Router();

api.get('/:id', CentromedicoController.getCentromedicoById);
api.get('', CentromedicoController.getCentromedicos);
api.post('', CentromedicoController.createCentromedico);
api.put('/:id', CentromedicoController.updateCentromedico);
api.delete('/:id', CentromedicoController.deleteCentromedico);

module.exports = api;