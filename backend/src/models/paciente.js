const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PacienteSchema = Schema({
	historiaclinica: {
		type: String,
	},
	nombre: {
		type: String,
	},
	apellido: {
		type: String,
	},
	bitacora: {
		type: String,
	},
	
});

module.exports = mongoose.model('Paciente', PacienteSchema);