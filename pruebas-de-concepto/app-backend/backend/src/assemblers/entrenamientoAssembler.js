const GenericAssembler = require('./genericAssembler')


const Entrenamiento = require('../models/entrenamiento')
const EntrenamientoDTO = require('../dtos/entrenamientoDTO')

class EntrenamientoAssembler extends GenericAssembler{

	static toDTOs(entrenamientos) {
		return super.convertList(entrenamientos, EntrenamientoAssembler.toDTO)
	}

	static fromDTOs(entrenamientosDTO) {
		return super.convertList(entrenamientosDTO, EntrenamientoAssembler.fromDTO)
	}

	static toDTO(entrenamiento) {
		const entrenamientoDTO = super.toDTO(entrenamiento, EntrenamientoDTO)
		entrenamientoDTO.fecha = entrenamiento.fecha
		entrenamientoDTO.peso = entrenamiento.peso
		
		return entrenamientoDTO
	}

	static fromDTO(entrenamientoDTO) {
		const entrenamiento = super.fromDTO(entrenamientoDTO, Entrenamiento)
		entrenamiento.fecha = entrenamientoDTO.fecha
		entrenamiento.peso = entrenamientoDTO.peso
		
		return entrenamiento
	}

}

module.exports = EntrenamientoAssembler