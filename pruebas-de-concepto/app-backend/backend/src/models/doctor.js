const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const DoctorSchema = Schema({
	centromedico: {
		type: String,
	},
	asistente: {
		type: String,
	},
	paciente: {
		type: String,
	},
	
});

module.exports = mongoose.model('Doctor', DoctorSchema);