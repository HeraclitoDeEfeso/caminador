const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UsuarioSchema = Schema({
	username: {
		type: String,
	},
	password: {
		type: String,
	},
	salt: {
		type: String,
	},
	
});

module.exports = mongoose.model('Usuario', UsuarioSchema);