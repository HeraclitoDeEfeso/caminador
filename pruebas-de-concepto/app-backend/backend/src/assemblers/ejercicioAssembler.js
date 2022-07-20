const GenericAssembler = require('./genericAssembler')


const Ejercicio = require('../models/ejercicio')
const EjercicioDTO = require('../dtos/ejercicioDTO')

class EjercicioAssembler extends GenericAssembler{

	static toDTOs(ejercicios) {
		return super.convertList(ejercicios, EjercicioAssembler.toDTO)
	}

	static fromDTOs(ejerciciosDTO) {
		return super.convertList(ejerciciosDTO, EjercicioAssembler.fromDTO)
	}

	static toDTO(ejercicio) {
		const ejercicioDTO = super.toDTO(ejercicio, EjercicioDTO)
		ejercicioDTO.velocidad = ejercicio.velocidad
		ejercicioDTO.duracion = ejercicio.duracion
		
		return ejercicioDTO
	}

	static fromDTO(ejercicioDTO) {
		const ejercicio = super.fromDTO(ejercicioDTO, Ejercicio)
		ejercicio.velocidad = ejercicioDTO.velocidad
		ejercicio.duracion = ejercicioDTO.duracion
		
		return ejercicio
	}

}

module.exports = EjercicioAssembler