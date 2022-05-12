const express = require('express')
const PacienteController = require('../controllers/pacienteController');

const api = express.Router();

api.get('/:id', PacienteController.getPacienteById);
api.get('', PacienteController.getPacientes);
api.post('', PacienteController.createPaciente);
api.put('/:id', PacienteController.updatePaciente);
api.delete('/:id', PacienteController.deletePaciente);

module.exports = api;