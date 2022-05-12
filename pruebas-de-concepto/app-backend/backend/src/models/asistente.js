const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AsistenteSchema = Schema({
	paciente: {
		type: String,
	},
	
});

module.exports = mongoose.model('Asistente', AsistenteSchema);