const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const EjercicioSchema = Schema({
	velocidad: {
		type: String,
	},
	duracion: {
		type: String,
	},
	
});

module.exports = mongoose.model('Ejercicio', EjercicioSchema);