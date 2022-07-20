const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MaquinaSchema = Schema({
	ubicacion: {
		type: String,
	},
	
});

module.exports = mongoose.model('Maquina', MaquinaSchema);