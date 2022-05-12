const express = require('express')
const MaquinaController = require('../controllers/maquinaController');

const api = express.Router();

api.get('/:id', MaquinaController.getMaquinaById);
api.get('', MaquinaController.getMaquinas);
api.post('', MaquinaController.createMaquina);
api.put('/:id', MaquinaController.updateMaquina);
api.delete('/:id', MaquinaController.deleteMaquina);

module.exports = api;