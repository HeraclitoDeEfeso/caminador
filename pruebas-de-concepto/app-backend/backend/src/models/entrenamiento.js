const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const EntrenamientoSchema = Schema({
	fecha: {
		type: Date,
	},
	peso: {
		type: String,
	},
	
});

module.exports = mongoose.model('Entrenamiento', EntrenamientoSchema);