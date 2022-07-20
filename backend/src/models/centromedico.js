const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CentromedicoSchema = Schema({
	ubicacion: {
		type: String,
	},
	maquinas: {
		type: String,
	},
	
});

module.exports = mongoose.model('Centromedico', CentromedicoSchema);