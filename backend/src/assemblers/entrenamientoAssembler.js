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
		entrenamientoDTO.modalidad = entrenamiento.modalidad
		entrenamientoDTO.ejercicio = entrenamiento.ejercicio
		
		return entrenamientoDTO
	}

	static fromDTO(entrenamientoDTO) {
		const entrenamiento = super.fromDTO(entrenamientoDTO, Entrenamiento)
		entrenamiento.modalidad = entrenamientoDTO.modalidad
		entrenamiento.ejercicio = entrenamientoDTO.ejercicio
		return entrenamiento
	}

}

module.exports = EntrenamientoAssembler