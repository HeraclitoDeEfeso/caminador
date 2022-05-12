const express = require('express')
const AsistenteController = require('../controllers/asistenteController');

const api = express.Router();

api.get('/:id', AsistenteController.getAsistenteById);
api.get('', AsistenteController.getAsistentes);
api.post('', AsistenteController.createAsistente);
api.put('/:id', AsistenteController.updateAsistente);
api.delete('/:id', AsistenteController.deleteAsistente);

module.exports = api;