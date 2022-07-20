const express = require('express')
const UsuarioMiddleware = require('../middlewares/usuarioMiddleware')
const UsuarioController = require('../controllers/usuarioController');

const api = express.Router();

api.get('/:id', UsuarioController.getUsuarioById);
api.get('', UsuarioController.getUsuarios);
api.post('', 
	...UsuarioMiddleware.createUserValidations(),
	UsuarioMiddleware.hashPassword,
	UsuarioController.createUsuario);
api.put('/:id', 
	...UsuarioMiddleware.createUserValidations(),
	UsuarioMiddleware.hashPassword,
	UsuarioController.updateUsuario);
api.delete('/:id', UsuarioController.deleteUsuario);
api.post('/login', UsuarioController.auth)
module.exports = api;