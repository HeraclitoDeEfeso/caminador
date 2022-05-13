const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const EntrenamientoSchema = Schema({
	fecha: {
		type: Date,
	},
	peso: {
		type: String,
	},
	modalidad: {
		type: String,
	},
	ejercicio: {
		type: Schema.ObjectId, ref:"Ejercicio"
	},
	
});

module.exports = mongoose.model('Entrenamiento', EntrenamientoSchema);