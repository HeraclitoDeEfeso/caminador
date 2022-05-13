const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const DoctorSchema = Schema({
	centromedico: {
		type: Schema.ObjectId, ref:"Centromedico"
	},
	asistente: {
		type: Schema.ObjectId, ref:"Asistente"
	},
	paciente: {
		type: Schema.ObjectId, ref:"Paciente"
	},
	
});

module.exports = mongoose.model('Doctor', DoctorSchema);