const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BitacoraSchema = Schema({
	fecha: {
		type: Date,
	},
	peso: {
		type: String,
	},
	entrenamiento: {
		type: Schema.ObjectId, ref:"Entrenamiento"
	},
	
});

module.exports = mongoose.model('Bitacora', BitacoraSchema);